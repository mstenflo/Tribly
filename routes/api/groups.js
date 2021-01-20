const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');
const CodeGenerator = require('node-code-generator');

const User = require('../../models/User');
const Group = require('../../models/Group');
const { findById } = require('../../models/User');

router.get('/', [auth], async (req, res) => {
  try {
    const groups = await Group.find().populate('group', ['name', 'description']);
    res.json(groups);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.post('/', [auth, [
  check('name', 'Name is required').not().isEmpty(),
  check('description', 'Please include a description').isEmpty(),
]], async (req, res) => {
    
  try {
    
    const code = new CodeGenerator();
    const pattern = '******';
    const howMany = 1;
    const options = {};
    const newCode = code.generateCodes(pattern, howMany, options);
    
    const newGroup = new Group({
      admin: req.user.id,
      name: req.body.name,
      description: req.body.description,
      inviteCode: newCode[0],
      contributors: [req.user.id]
    });
    
    
    const group = await newGroup.save();
    const profile = await Profile.findOne({user: req.user.id});
    profile.groups.push({ _id: group._id, name: group.name, description: group.description });
    await profile.save();

    res.json(group);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.get('/:id', auth, async (req, res) => {
  try {
    const group = await Group.findById(req.params.id)
    
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
      text: req.body.comment
    }

    group.comments.unshift(newComment);
    await group.save();

    res.json(group);
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
        avatar: profile.avatar
      },
      title: req.body.title,
      text: req.body.text
    }

    group.topics.unshift(newTopic);
    await group.save();

    res.json(group);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.post('/:groupId/topic/:topicId/contribution', auth, async (req, res) => {
  try {
    const group = await Group.findById(req.params.groupId);

    if (!group) {
      return res.status(400).json({ msg: 'Group not found' });
    }

    const profile = await Profile.findOne({ user: req.user.id });
    const user = await User.findById(req.user.id);

    const newContribution = {
      author: {
        id: req.user.id,
        name: user.name,
        avatar: profile.avatar
      },
      text: req.body.text,
      file: req.body.file
    }

    // const topic = group.topics.filter(topic => topic._id.equals(req.params.topicId))
    // topic[0].contributions.unshift(newContribution);
    // console.log(topic[0])

    // const query = { "topics._id": req.params.topicId };
    const update = { $push: { "topics.$[topic].contributions": newContribution } };
    const options = {
      arrayFilters: [
        {
          "topic._id": req.params.topicId
        }
      ]
    }
    const res = await group.updateOne(update, options);
    // const options = newContribution;
    // group.topics.insertOne(newContribution);
    console.log(res)
    res.json(res);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
})

module.exports = router;