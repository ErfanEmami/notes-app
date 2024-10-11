import express from 'express';
import session from 'express-session';
import connectMongo from 'connect-mongo';
import authRoutes from './routes/auth_routes.js';
import noteRoutes from './routes/notes_routes.js';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';

dotenv.config();  // Load environment variables from .env file

const app = express();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('MongoDB connected');
})
.catch((error) => {
  console.error('Error connecting to MongoDB:', error);
});

// Middleware for parsing requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Enable CORS to allow requests from the frontend
app.use(cors({
  origin: 'http://localhost:3000',  // Frontend origin (React app)
  credentials: true  // Allow session cookies to be sent with requests
}));

// Session configuration with MongoStore
app.use(
  session({
    secret: process.env.SESSION_SECRET,   // Secret for signing session ID cookies
    resave: false,                        // Prevents resaving unchanged sessions
    saveUninitialized: false,             // Don't save uninitialized sessions
    store: connectMongo.create({          // Directly use connectMongo.create() to configure session store
      mongoUrl: process.env.MONGO_URI,    // MongoDB connection string from .env
    }),
    cookie: {
      httpOnly: true,                     // Prevent client-side JS access to cookies
      secure: process.env.NODE_ENV === 'production',  // Use secure cookies in production
      maxAge: 1000 * 60 * 60 * 24,        // Session expires in 1 day
    },
  })
);

// Routes
app.use('/api/auth', authRoutes);  // Authentication routes
app.use('/api/notes', noteRoutes); // Notes routes

export default app;
