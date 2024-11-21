const mongoose = require('mongoose');

const userGroupSchema = new mongoose.Schema({
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  groupId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Group',
    // required: true,
  },
  role: {
    type: String,
    enum: ['member', 'admin'],
    default: 'member',
  },
  joinedAt: {
    type: Date,
    default: Date.now,
  },
});

const UserGroup = mongoose.model('UserGroup', userGroupSchema);
module.exports = UserGroup;
