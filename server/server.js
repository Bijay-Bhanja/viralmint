const express = require('express');
const dotenv = require('dotenv');
// const morgan = require('morgan');
const cors = require('cors');
const connectDB = require('./config/db');

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();


// Initialize Express app
const app = express();

// Middleware
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(express.json()); // Parse JSON request bodies
// app.use(morgan('dev')); // Log HTTP requests

// Routes
app.use('/api/users', require('./routes/authRoutes')); // Auth routes
app.use('/api/blogs', require('./routes/blogRoutes')); // Blog routes
// app.use('/api/payment', require('./routes/paymentRoutes'));//payment routes


// Error handling middleware
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).json({ message: 'Server Error' });
// });


// Serve the frontend (optional if you're using Vercel or a similar service to host the frontend separately)
// if (process.env.NODE_ENV === 'production') {
//   const path = require('path');
//   app.use(express.static(path.join(__dirname, '../frontend/build')));
  
//   app.get('*', (req, res) => {
//     res.sendFile(path.resolve(__dirname, '../frontend', 'build', 'index.html'));
//   });
// }

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
