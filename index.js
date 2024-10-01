const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
const products = require('./routes/product');
const stripe = require('./routes/stripe');
const auth = require('./middleware/auth');


// Initialize environment variables
dotenv.config();

const app = express();
app.use(cors({
    origin: 'http://localhost:3000', // Allow requests from your React app
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Specify allowed methods
    credentials: true // Allow credentials if needed
}));
// Connect to database
connectDB();

// Middleware to parse JSON bodies
app.use(express.json());

// Routes
app.use('/api/auth',authRoutes);
app.use('/api/product',auth, products);
app.use('/api/stripe',auth, stripe);


const PORT = 8080;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
