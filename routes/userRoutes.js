const express = require('express');
const router = express.Router();
const { createUserOrJoinRoom } = require('../controllers/userController');

// Endpoint to handle user joining or creating a room
router.post('/join-room', createUserOrJoinRoom);

module.exports = router;
