const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// Initialize express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Basic route
app.get('/', (req, res) => {
  res.send('FitTrack API is running');
});
// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/activities', require('./routes/activities'));
app.use('/api/bmi', require('./routes/bmi'));
// Routes will be added here
// app.use('/api/users', require('./routes/users'));
// app.use('/api/auth', require('./routes/auth'));
// app.use('/api/workouts', require('./routes/workouts'));
// app.use('/api/activities', require('./routes/activities'));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// const express = require("express");
// const mongoose = require("mongoose");
// const dotenv = require("dotenv");
// const authRoutes = require("./routes/auth");
// const activityRoutes = require("./routes/activities"); // ✅ this line
// const bmiRoutes = require("./routes/bmi");

// dotenv.config();

// const app = express();
// app.use(express.json());

// mongoose.connect(process.env.MONGO_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// }).then(() => console.log("Connected to MongoDB"))
//   .catch((err) => console.log("MongoDB error:", err));

// // ✅ Route setup
// app.use("/api/auth", authRoutes);
// app.use("/api/activities", activityRoutes); // ✅ this line is important!
// app.use("/api/bmi", bmiRoutes);

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
