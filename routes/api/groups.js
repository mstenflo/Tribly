const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');
const CodeGenerator = require('node-code-generator');

const User = require('../../models/User');
const Group = require('../../models/Group');

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
    const user = await User.findById(req.user.id);
    user.groups.push({ id: group._id, name: group.name });
    await user.save();

    res.json(group);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;