const { json } = require('express');
const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

const Latest = require('../../models/Latest');

router.post('/', auth, async (req, res) => {
  try {
    latest = new Latest(req.body);
    
    await latest.save();
    res.json(latest)
  } catch (err) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

router.get('/', auth, async (req, res) => {
  try {
    const latest = await Latest.find().populate('latest', ['type', 'data'])
    
    res.json(latest);
  } catch (err) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
})

module.exports = router;