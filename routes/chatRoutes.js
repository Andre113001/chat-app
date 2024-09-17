const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chatContoller');

// Route to fetch chats for a specific room
router.get('/get_chats/:room', async (req, res) => {
    try {
        const room = req.params.room;
        const chats = await chatController.getChatsByRoom(room);
        res.json(chats);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
