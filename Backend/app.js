// import dependencies
import express from 'express';
import cors from 'cors';
import dotenv from "dotenv";
import cookieParser from 'cookie-parser';
dotenv.config();

// 📁 Import Routes
import authRoutes from './routes/authRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import supplierRoutes from './routes/supplierRoutes.js';
// 🚀 Initialize Express App
const app = express();
app.use(express.json());
app.use(cookieParser());

// 🌍 CORS Configuration
const corsOptions = {
  origin: (origin, callback) => {
    callback(null, true); // allow all origins
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE','PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
};
app.use(cors(corsOptions));

// 🛡️ Request Logger (for debugging and insight)
app.use((req, res, next) => {
  const now = new Date().toLocaleString('en-IN');
  console.log(`→_→ 🚀📧 [${now}] ${req.method} request to 🔗 ${req.originalUrl}`);
  next();
});

app.get('/', (req, res) => {
  res.send('Server is up and running like a dream machine!');
});

app.use('/api/auth', authRoutes); // 🔐 Authentication Routes
app.use('/api/admin', adminRoutes); 
app.use('/api/suppliers', supplierRoutes); 
// app.use('/api/product', productRoutes); //
// app.use('/api/purchase', purchaseRoutes); //

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found - perhaps lost in space.',
  });
});

app.use((err, req, res, next) => {
  console.error('Internal Server Error:', err.stack || err);
  res.status(500).json({
    success: false,
    message: '💥 Server Error - we’re working on it.',
  });
});

export default app;