const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { authenticate, isAdmin } = require('../middlewares/auth');

// Get Role specific people
router.get('/:role',authenticate,async(req,res)=>{
    const users = await User.find({ role: req.params.role });
    res.json(users);
})

module.exports = router