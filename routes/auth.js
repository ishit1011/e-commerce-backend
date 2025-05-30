const express = require('express');
const router = express.Router();
const { authenticate } = require('../middlewares/auth');
const Approved = require('../models/ApprovedEmails');

// router.get('/check-role', authenticate, (req, res) => {
//     res.status(200).json({ role: req.user.role });
// });


// GET /api/check-email/:email
router.get("/check-email/:email", async (req, res) => {
  const email = req.params.email;
  const approved = await Approved.findOne({ email });

  if (approved) {
    return res.status(200).json({ approved: true });
  } else {
    return res.status(403).json({ approved: false });
  }
});


module.exports = router;
