const pool = require('../config/db'); // Assuming you're using a MySQL connection pool

const createUserOrJoinRoom = async (req, res) => {
    const { username, room } = req.body;

    try {
        // Check if the user already exists in the database
        const [existingUser] = pool.query(
        "SELECT * FROM users WHERE username = ?",
        [username]
        );

        if (existingUser.length > 0) {
        // User exists, join the room
        res.status(200).json({ message: "User exists, joined room", room });
        } else {
        // User does not exist, create new user
        await pool.query("INSERT INTO users (username, room) VALUES (?, ?)", [
            username,
            room,
        ]);
        res.status(201).json({ message: "New user created and joined room", room });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { createUserOrJoinRoom };
