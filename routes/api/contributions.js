const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');

const Contribution = require('../../models/Contribution');

router.get('/', [auth], async (req, res) => {
  try {
    const contributions = await Contribution.find()
    res.json(contributions);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.post('/:groupId/topic/:topicId', auth, async (req, res) => {
  try {
    const group = await Group.findById(req.params.groupId);

     if (!group) {
      return res.status(400).json({ msg: 'Group not found' });
    }

    const profile = await Profile.findOne({ user: req.user.id });
    const user = await User.findById(req.user.id);
    const topic = group.topics.filter(topic => topic._id === req.params.topicId);

    const newContribution = new Contribution({
      author: {
        id: req.user.id,
        name: user.name,
        avatar: profile.avatar
      },
      group: {
        name: group.name,
        id: req.params.groupId
      },
      topic: {
        title: topic.title,
        id: req.params.topicId
      },
      title: req.body.title,
      text: req.body.text,
      filetype: req.body.filetype,
      file: req.body.file,
      youtube: req.body.youtube,
      link: req.body.link
    });

    const contribution = await newContribution.save();

    res.json(contribution);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
})

module.exports = router;