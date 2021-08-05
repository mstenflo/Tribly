const express = require('express');
const auth = require('../../middleware/auth');

const router = express.Router();

const Latest = require('../../models/Latest');

router.post('/', auth, async (req, res) => {
  try {
    const latest = new Latest(req.body);

    await latest.save();
    res.json(latest);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.get('/', auth, async (req, res) => {
  try {
    const latest = await Latest.find().populate('latest', ['type', 'data']);

    res.json(latest);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
