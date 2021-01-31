const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');

const Profile = require('../../models/Profile');
const User = require('../../models/User');

router.get('/me', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id }).populate('User', ['name', 'avatar']);

    if (!profile) {
      return res.status(400).json({ msg: 'There is no profile for this user' });
    }

    res.json(profile);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

router.post('/', [auth], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    
    const {
      website,
      avatar,
      location,
      bio,
      skills,
      youtube,
      facebook,
      twitter,
      instagram,
    } = req.body;

    const profileFields = {};
    profileFields.user = req.user.id;
    profileFields.name = req.user.name;
    if (website) profileFields.website = website;
    if (avatar) profileFields.avatar = avatar;
    if (location) profileFields.location = location;
    if (bio) profileFields.bio = bio;
    if (skills) {
      profileFields.skills = skills.split(',').map((skill) => skill.trim());
    }

    //Build social object
    profileFields.social = {};
    if (youtube) profileFields.social.youtube = youtube;
    if (twitter) profileFields.social.twitter = twitter;
    if (instagram) profileFields.social.instagram = instagram;
    if (facebook) profileFields.social.facebook = facebook;

    try {
      let profile = await Profile.findOne({ user: req.user.id });


      if (profile) {
        profile = await Profile.findOneAndUpdate({ user: req.user.id }, { $set: profileFields }, { new: true });

        return res.json(profile);
      }
      profile = new Profile(profileFields);

      await profile.save();
      res.json(profile);
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server Error');
    }
  }
);

router.get('/', async (req, res) => {
  try {
    const profiles = await Profile.find().populate('user', ['name', 'avatar']);
    res.json(profiles);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

router.get('/user/:user_id', async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.params.user_id }).populate('user', ['name', 'avatar'], 'user');

    if (!profile) {
      return res.status(400).json({ msg: 'Profile not found' });
    }
    res.json(profile);
  } catch (error) {
    console.error(error.message);
    if (error.kind === 'ObjectId') {
      return res.status(400).json({ msg: 'Profile not found' });
    }
    res.status(500).send('Server Error');
  }
});

router.delete('/', auth, async (req, res) => {
  try {
    await Profile.findOneAndRemove({ user: req.user.id });

    await User.findOneAndRemove({ _id: req.user.id });

    res.json({ msg: 'User deleted' });
    res.json(profiles);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.post('/:profileId/group', auth, async (req, res) => {
  try {
    const profile = Profile.findById(req.params.profileId);

    if (!profile) {
      return res.status(400).json({ msg: 'Profile not found' });
    }
    
    const group = await Group.findById(req.body.groupId).populate('Group', ['_id', 'name', 'description']);

    if (!group) {
      return res.status(400).json({ msg: 'Group not found' });
    }

    await profile.updateOne({ $push: { groups: { _id: group._id, name: group.name, description: group.description } } })

    res.json(req.body.groupId);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;