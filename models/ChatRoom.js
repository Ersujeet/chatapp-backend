const mongoose = require('mongoose');

const ChatRoomSchema = new mongoose.Schema({
  name: { type: String, required: true },
  // users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  users:{type: String, required: true},
  messages: [
    {
      username: String,
      text: String,
      createdAt: { type: Date, default: Date.now },
    },
  ],
});

module.exports = mongoose.model('ChatRoom', ChatRoomSchema);
