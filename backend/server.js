import express from 'express';
import mongoose from 'mongoose';
//import bcrypt from 'bcrypt';
import { User } from './db/user.js';

const app = express();
const port = 8000;

app.listen(port, () => console.log(`Server running on ${port}`));

app.get('/', (req, res) => {
    res.send('Hello World!');
});

// Middleware for parsing JSON
app.use(express.json());

// Connect to the database
const connectDB = async () => {
    try {
        await mongoose.connect(`mongodb+srv://shubham:28012003@cluster0.uhpmz8t.mongodb.net/mydatabase`);
        console.log("Connected to the database");
    } catch (error) {
        console.error("Error connecting to the database:", error.message);
    }
};

connectDB();

// Registration
app.post('/register', async (req, res) => {
    try {
        const { email, password } = req.body;
        
        // Hash the password before saving


        const user = new User({ email, password});
        await user.save();
        
        res.status(201).send({ message: 'User created!' });
    } catch (error) {
        console.error("Error in registration:", error.message);
        res.status(400).send({ error: 'Failed to create new user' });
    }
});

// Login
app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({ error: 'Invalid email' });
        }

        // Compare hashed password
     
        if (user.password !== password) {
            return res.status(401).json({ error: 'Invalid Password' });
        }
        res.status(200).send({ message: 'Login successful' });
    } catch (error) {
        console.error("Error in login:", error.message);
        res.status(500).json({ error: "Error in login" });
    }
});
