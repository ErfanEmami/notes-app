import express from 'express';
import session from 'express-session';
import connectMongo from 'connect-mongo';
import authRoutes from './routes/auth_routes.js';
import noteRoutes from './routes/notes_routes.js';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

const app = express();
const MongoStore = connectMongo(session);

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session configuration
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 1000 * 60 * 60 * 24, // 1 day
    },
  })
);

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/notes', noteRoutes);

export default app;
