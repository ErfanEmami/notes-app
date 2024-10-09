// server.js
import dotenv from 'dotenv';
import connectDB from './db.js';
import app from './app.js';  // Import the app logic

dotenv.config();

// Connect to the database
connectDB();

// Start the server and listen on the defined port
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
