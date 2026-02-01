const LostItem = require('../models/LostItem');

exports.createLostItem = async (req, res) => {
  try {
    // ✅ SAFE handling (this is the fix)
    const photos = req.files ? req.files.map(file => file.path) : [];

    const lostItem = new LostItem({
      ...req.body,
      photos
    });

    await lostItem.save();

    res.status(201).json({
      success: true,
      message: 'Lost item saved',
      item: lostItem
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      error: err.message
    });
  }
};
