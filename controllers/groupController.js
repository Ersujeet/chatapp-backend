// controllers/groupController.js
const Group = require('../models/Group');
const UserGroup = require('../models/Usergroup');
const User = require('../models/User');

// Create a Group
exports.createGroup = async (req, res) => {
  const { groupName, createdBy } = req.body;
  // const userId = req.user.userId; // userId from JWT payload
  // const createdBy = userId;

  try {
    // Check if group already exists
    const existingGroup = await Group.findOne({ groupName });
    if (existingGroup) {
      return res.status(400).json({ message: 'Group already exists' });
    }

    // Create new group
    const group = new Group({
      groupName,
      createdBy,
    });

    await group.save();

    // Add the user as the admin of the group
    const userGroup = new UserGroup({
      createdBy,
      groupId: group._id,
      role: 'admin',
    });

    await userGroup.save();
    res.status(201).json({ message: 'Group created successfully', group });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get All Groups
exports.getGroups = async (req, res) => {
  try {
    const groups = await Group.find();
    res.json(groups);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
