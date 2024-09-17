const db = require('../config/db');

// Save chat message to MySQL
exports.saveChat = (data) => {
    return new Promise((resolve, reject) => {
        const { room, author, message } = data;
        const sql = 'INSERT INTO chats (room, username, message) VALUES (?, ?, ?)';
        db.query(sql, [room, author, message], (err, result) => {
            if (err) {
                console.error('Error saving chat to database:', err);
                return reject(err);
            }
            resolve(result);
        });
    });
};

// Retrieve chats by room
exports.getChatsByRoom = (room) => {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM chats WHERE room = ? ORDER BY timestamp ASC';
        db.query(sql, [room], (err, result) => {
            if (err) {
                console.error('Error retrieving chats from database:', err);
                return reject(err);
            }
            resolve(result);
        });
    });
};
