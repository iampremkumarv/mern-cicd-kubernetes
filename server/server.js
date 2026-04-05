const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const projectRoutes = require('./routes/projectRoutes');
const contactRoutes = require('./routes/contactRoutes');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/projects', projectRoutes);
app.use('/api/contacts', contactRoutes);

app.get('/', (req, res) => {
    res.send('Interior Design API is running...');
});

// Connect to database and start server
const startServer = async () => {
    try {
        // Enforce DB connection before starting Express server
        await connectDB();
        console.log('MongoDB connected successfully');

        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });

    } catch (err) {
        // Stop server initialization if DB connection fails
        console.error('MongoDB connection failed:', err.message);
        process.exit(1);
    }
};

startServer();