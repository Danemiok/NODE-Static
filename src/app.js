import express from 'express';
// Import module - Routes (MVC)
import UserRoutes from './routes/UserRoutes.js';

// ==================== MVC APPLICATION ====================
// Express app initialization
const app = express();

// Middleware - Parse JSON body
app.use(express.json());

// Routes - Connect to controller via routes
app.use('/api', UserRoutes);


// Start server
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});