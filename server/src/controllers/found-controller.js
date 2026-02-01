const FoundItem = require('../models/FoundItem');

exports.createFoundItem = async (req, res) => {
  try {
    const photos = req.files ? req.files.map(f => f.path) : [];

    const foundItem = new FoundItem({
      ...req.body,
      photos
    });

    await foundItem.save();

    res.status(201).json({
      success: true,
      message: 'Found item saved',
      item: foundItem
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};
