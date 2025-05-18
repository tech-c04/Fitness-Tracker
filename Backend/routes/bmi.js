// const express = require('express');
// const router = express.Router();
// const auth = require('../middleware/auth');
// const BMI = require('../models/BMI');
// const User = require('../models/User');

// // Calculate and save BMI
// router.post('/', auth, async (req, res) => {
//   try {
//     const { height, weight } = req.body;
    
//     // Calculate BMI (weight in kg / height in m^2)
//     const heightInMeters = height / 100;
//     const bmiValue = weight / (heightInMeters * heightInMeters);
    
//     // Save to BMI history
//     const newBMI = new BMI({
//       user: req.user.id,
//       height,
//       weight,
//       bmi: bmiValue.toFixed(2)
//     });
    
//     // Update user's height and weight
//     await User.findByIdAndUpdate(req.user.id, { height, weight });
    
//     const savedBMI = await newBMI.save();
//     res.json(savedBMI);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send('Server Error');
//   }
// });

// // Get BMI history
// router.get('/history', auth, async (req, res) => {
//   try {
//     const bmiHistory = await BMI.find({ user: req.user.id }).sort({ date: -1 });
//     res.json(bmiHistory);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send('Server Error');
//   }
// });

// // Get latest BMI
// router.get('/latest', auth, async (req, res) => {
//   try {
//     const latestBMI = await BMI.findOne({ user: req.user.id }).sort({ date: -1 });
//     res.json(latestBMI);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send('Server Error');
//   }
// });

// module.exports = router;

const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const BMI = require('../models/BMI');
const User = require('../models/User');

// ✅ Calculate and save BMI
router.post('/', auth, async (req, res) => {
  try {
    const { height, weight } = req.body;

    // ✅ Input validation
    if (!height || !weight) {
      return res.status(400).json({ error: 'Height and weight are required' });
    }

    if (typeof height !== 'number' || typeof weight !== 'number') {
      return res.status(400).json({ error: 'Height and weight must be numbers' });
    }

    if (height <= 0 || weight <= 0) {
      return res.status(400).json({ error: 'Height and weight must be positive values' });
    }

    // ✅ Calculate BMI
    const heightInMeters = height / 100;
    const bmiValue = weight / (heightInMeters * heightInMeters);

    // ✅ Save to BMI history
    const newBMI = new BMI({
      user: req.user.id,
      height,
      weight,
      bmi: bmiValue.toFixed(2)
    });

    // ✅ Update user's profile
    await User.findByIdAndUpdate(req.user.id, { height, weight });

    const savedBMI = await newBMI.save();
    res.status(201).json(savedBMI);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Server Error' });
  }
});

// ✅ Get BMI history
router.get('/history', auth, async (req, res) => {
  try {
    const bmiHistory = await BMI.find({ user: req.user.id }).sort({ date: -1 });
    res.json(bmiHistory);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Failed to fetch BMI history' });
  }
});

// ✅ Get latest BMI
router.get('/latest', auth, async (req, res) => {
  try {
    const latestBMI = await BMI.findOne({ user: req.user.id }).sort({ date: -1 });

    if (!latestBMI) {
      return res.status(404).json({ error: 'No BMI data found' });
    }

    res.json(latestBMI);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Failed to fetch latest BMI' });
  }
});

module.exports = router;
