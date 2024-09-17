const express = require('express');
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
const chatRoutes = require('./routes/chatRoutes');
const userRoutes = require('./routes/userRoutes');
const chatController = require('./controllers/chatContoller');


const app = express();
app.use(cors());
app.use(express.json());

// Import routes
app.use('/api/chats', chatRoutes);
app.use('/api/users', userRoutes);

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
    }
});

io.on("connection", (socket) => {
    console.log(`User Connected: ${socket.id}`);

    socket.on("join_room", (data) => {
        socket.join(data);
        console.log(`User with ID: ${socket.id} joined room: ${data}`);
    }); 

    socket.on("send_message", async (data) => {
        // Emit the message to other users in the room
        socket.to(data.room).emit("receive_message", data);

        // Save the chat message to the database
        try {
            await chatController.saveChat(data);
            console.log("Chat saved to database");
        } catch (err) {
            console.error("Error saving chat to database:", err);
        }
    });

    socket.on("disconnect", () => {
        console.log("User Disconnected", socket.id);
    });
});

server.listen(3001, () => {
    console.log("SERVER RUNNING on port 3001");
});
