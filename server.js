const express = require('express');
const connectToDB = require('./config/db');

const app = express();

// Connect Database
connectToDB();

// Init Middleware
app.use(express.json({ extended: false }));

app.get('/', (req, res) => res.send('API Running'));

// Define Routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/listings', require('./routes/api/listings'));
app.use('/api/upload', require('./routes/api/upload'));
app.use('/uploads', express.static('uploads'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
