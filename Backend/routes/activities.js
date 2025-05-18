// const express = require('express');
// const router = express.Router();
// const auth = require('../middleware/auth');
// const Activity = require('../models/Activity');

// // Get all activities for a user
// router.get('/', auth, async (req, res) => {
//   try {
//     const activities = await Activity.find({ user: req.user.id }).sort({ date: -1 });
//     res.json(activities);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send('Server Error');
//   }
// });

// // Get today's activity for a user
// router.get('/today', auth, async (req, res) => {
//   try {
//     console.info('inside today API: ')
//     const today = new Date();
//     today.setHours(0, 0, 0, 0);
    
//     const tomorrow = new Date(today);
//     tomorrow.setDate(tomorrow.getDate() + 1);
    
//     const activity = await Activity.findOne({
//       user: req.user.id,
//       date: { $gte: today, $lt: tomorrow }
//     });
    
//     if (!activity) {
//       // Create a new activity record for today
//       const newActivity = new Activity({
//         user: req.user.id
//       });
      
//       const savedActivity = await newActivity.save();
//       return res.json(savedActivity);
//     }
    
//     res.json(activity);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send('Server Error');
//   }
// });

// // Update steps
// router.put('/steps', auth, async (req, res) => {
//   try {
    
//     const { steps } = req.body;
//     console.info('Steps API called with parameters'+steps);
    
//     const today = new Date();
//     today.setHours(0, 0, 0, 0);
    
//     const tomorrow = new Date(today);
//     tomorrow.setDate(tomorrow.getDate() + 1);
    
//     let activity = await Activity.findOne({
//       user: req.user.id,
//       date: { $gte: today, $lt: tomorrow }
//     });
    
//     if (!activity) {
//       activity = new Activity({
//         user: req.user.id,
//         steps
//       });
//     } else {
//       activity.steps = steps;
//     }
    
//     const updatedActivity = await activity.save();
//     res.json(updatedActivity);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send('Server Error');
//   }
// });

// // Update sleep
// router.put('/sleep', auth, async (req, res) => {
//   try {
//     const { nightSleep, noonNap } = req.body;
    
//     const today = new Date();
//     today.setHours(0, 0, 0, 0);
    
//     const tomorrow = new Date(today);
//     tomorrow.setDate(tomorrow.getDate() + 1);
    
//     let activity = await Activity.findOne({
//       user: req.user.id,
//       date: { $gte: today, $lt: tomorrow }
//     });
    
//     if (!activity) {
//       activity = new Activity({
//         user: req.user.id,
//         nightSleep,
//         noonNap
//       });
//     } else {
//       activity.nightSleep = nightSleep;
//       activity.noonNap = noonNap;
//     }
    
//     const updatedActivity = await activity.save();
//     res.json(updatedActivity);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send('Server Error');
//   }
// });

// // Add this to your routes/activities.js if it's not already there
// // Create a new activity
// router.post('/', auth, async (req, res) => {
//   try {
//     const { steps, nightSleep, noonNap, calories } = req.body;
    
//     const newActivity = new Activity({
//       user: req.user.id,
//       steps,
//       nightSleep,
//       noonNap,
//       calories
//     });
    
//     const activity = await newActivity.save();
//     res.json(activity);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send('Server Error');
//   }
// });

// module.exports = router;

const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Activity = require('../models/Activity');

// ✅ Get all activities for a user
router.get('/', auth, async (req, res) => {
  try {
    const activities = await Activity.find({ user: req.user.id }).sort({ date: -1 });
    res.json(activities);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Failed to fetch activities' });
  }
});

// ✅ Get today's activity or create a new one
router.get('/today', auth, async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    let activity = await Activity.findOne({
      user: req.user.id,
      date: { $gte: today, $lt: tomorrow }
    });

    if (!activity) {
      activity = new Activity({ user: req.user.id });
      await activity.save();
    }

    res.json(activity);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Failed to fetch or create today\'s activity' });
  }
});

// ✅ Update steps for today
router.put('/steps', auth, async (req, res) => {
  try {
    const { steps, calories } = req.body;

    if (steps === undefined || typeof steps !== 'number' || steps < 0) {
      return res.status(400).json({ error: 'Steps must be a non-negative number' });
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    let activity = await Activity.findOne({
      user: req.user.id,
      date: { $gte: today, $lt: tomorrow }
    });

    if (!activity) {
      activity = new Activity({ user: req.user.id, steps, calories});
    } else {
      activity.steps = steps;
      activity.calories = calories;
    }

    const updatedActivity = await activity.save();
    res.json(updatedActivity);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Failed to update steps' });
  }
});

// ✅ Update sleep for today
router.put('/sleep', auth, async (req, res) => {
  try {
    const { nightSleep, noonNap } = req.body;

    if (
      nightSleep === undefined || noonNap === undefined ||
      typeof nightSleep !== 'number' ||
      typeof noonNap !== 'number' ||
      nightSleep < 0 || noonNap < 0
    ) {
      return res.status(400).json({ error: 'nightSleep and noonNap must be non-negative numbers' });
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    let activity = await Activity.findOne({
      user: req.user.id,
      date: { $gte: today, $lt: tomorrow }
    });

    if (!activity) {
      activity = new Activity({ user: req.user.id, nightSleep, noonNap });
    } else {
      activity.nightSleep = nightSleep;
      activity.noonNap = noonNap;
    }

    const updatedActivity = await activity.save();
    res.json(updatedActivity);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Failed to update sleep data' });
  }
});

// ✅ Manually create a new activity (optional endpoint)
router.post('/', auth, async (req, res) => {
  try {
    const { steps, nightSleep, noonNap, calories } = req.body;

    // Optional: validate values if needed
    const newActivity = new Activity({
      user: req.user.id,
      steps: typeof steps === 'number' ? steps : 0,
      nightSleep: typeof nightSleep === 'number' ? nightSleep : 0,
      noonNap: typeof noonNap === 'number' ? noonNap : 0,
      calories: typeof calories === 'number' ? calories : 0
    });

    const activity = await newActivity.save();
    res.status(201).json(activity);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Failed to create activity' });
  }
});

module.exports = router;
