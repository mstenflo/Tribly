const express = require('express');
const { check } = require('express-validator');
const CodeGenerator = require('node-code-generator');
const auth = require('../../middleware/auth');

const router = express.Router();

const User = require('../../models/User');
const Group = require('../../models/Group');
const Profile = require('../../models/Profile');

router.get('/', [auth], async (req, res) => {
  try {
    const groups = await Group.find().populate('group', [
      'name',
      'description',
    ]);
    res.json(groups);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.post(
  '/',
  [
    auth,
    [
      check('name', 'Name is required').not().isEmpty(),
      check('description', 'Please include a description').isEmpty(),
    ],
  ],
  async (req, res) => {
    try {
      const code = new CodeGenerator();
      const pattern = '******';
      const howMany = 1;
      const options = {};
      const newCode = code.generateCodes(pattern, howMany, options);

      const user = await User.findById(req.user.id);

      const newGroup = new Group({
        admin: { id: req.user.id, name: user.name },
        name: req.body.name,
        description: req.body.description,
        inviteCode: newCode[0],
        contributors: [req.user.id],
      });

      const group = await newGroup.save();
      const profile = await Profile.findOne({ user: req.user.id });
      profile.groups.push({
        _id: group._id,
        name: group.name,
        description: group.description,
      });
      await profile.save();

      res.json(group);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

router.get('/:id', auth, async (req, res) => {
  try {
    const group = await Group.findById(req.params.id);

    if (!group) {
      return res.status(404).json({ msg: 'Group not found' });
    }
    res.json(group);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Group not found' });
    }

    res.status(500).send('Server Error');
  }
});

router.post('/:id/comment', [auth], async (req, res) => {
  try {
    const group = await Group.findById(req.params.id);

    if (!group) {
      return res.status(404).json({ msg: 'Group not found' });
    }

    const profile = await Profile.findOne({ user: req.user.id });
    const user = await User.findById(req.user.id);

    const newComment = {
      author: {
        id: req.user.id,
        name: user.name,
        avatar: profile.avatar,
      },
      text: req.body.comment,
    };

    group.comments.unshift(newComment);
    await group.save();

    res.json(newComment);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.post('/:id/topic', auth, async (req, res) => {
  try {
    const group = await Group.findById(req.params.id);

    if (!group) {
      return res.status(400).json({ msg: 'Group not found' });
    }

    const profile = await Profile.findOne({ user: req.user.id });
    const user = await User.findById(req.user.id);

    const newTopic = {
      author: {
        id: req.user.id,
        name: user.name,
        avatar: profile.avatar,
      },
      title: req.body.title,
      text: req.body.text,
    };

    group.topics.unshift(newTopic);
    await group.save();

    res.json(group.topics[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.get('/:groupId/topic/:topicId', auth, async (req, res) => {
  try {
    const group = await Group.findById(req.params.groupId);

    if (!group) {
      return res.status(400).json({ msg: 'Group not found' });
    }

    const topic = group.topics.filter(
      (el) => String(el._id) === req.params.topicId
    );

    res.json(...topic);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.post('/:groupId/topic/:topicId/comment', auth, async (req, res) => {
  try {
    const group = await Group.findById(req.params.groupId);

    if (!group) {
      return res.status(400).json({ msg: 'Group not found' });
    }

    const profile = await Profile.findOne({ user: req.user.id });
    const user = await User.findById(req.user.id);

    const newComment = {
      author: {
        id: req.user.id,
        name: user.name,
        avatar: profile.avatar,
      },
      text: req.body.comment,
    };

    const update = { $push: { 'topics.$[topic].comments': newComment } };
    const options = {
      arrayFilters: [
        {
          'topic._id': req.params.topicId,
        },
      ],
    };

    await group.updateOne(update, options);

    res.json(newComment);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
