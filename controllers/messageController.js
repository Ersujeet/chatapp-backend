const Message = require('../models/Messages');
const Group = require('../models/Group');
const User = require('../models/User');

// Controller to send a message
exports.sendMessage = async (req, res) => {
  const { groupId, messageText, userId } = req.body;
//   const userId = req.user.userId; // userId from the JWT payload

  try {
    // Check if group exists
    const group = await Group.findById(groupId);
    if (!group) {
      return res.status(404).json({ message: 'Group not found' });
    }

    // Create a new message
    const message = new Message({
      userId,
      groupId,
      messageText,
    });

    // Save the message
    await message.save();

    // Respond with success message
    res.status(201).json({ message: 'Message sent successfully', message });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Controller to get messages by groupId
exports.getMessagesByGroup = async (req, res) => {
  const { groupId } = req.params;

  try {
    // Fetch messages for the given groupId
    const messages = await Message.find({ groupId })
      .populate('userId', 'username') // Populating userId with the username
      .populate('groupId', 'groupName') // Populating groupId with the groupName
      .sort({ timestamp: 1 }); // Sorting messages by timestamp (ascending)

    // Respond with the messages
    res.json(messages);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
