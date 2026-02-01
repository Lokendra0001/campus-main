const express = require('express');
const upload = require('../middlewares/upload');
const { createLostItem } = require('../controllers/lost.controller');
const { createFoundItem } = require('../controllers/found.controller');

const router = express.Router();

router.post('/lost', upload.array('photos', 5), createLostItem);
router.post('/found', upload.array('photos', 5), createFoundItem);

module.exports = router;
