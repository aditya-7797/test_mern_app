const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const mongoose = require('mongoose');
const userModel = require('./models/userModel');

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

const bcrypt = require('bcrypt');


// Connect to MongoDB 
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.error('Failed to connect to MongoDB', err);
});

app.get('/blogs', (req, res) => {
    res.send('Hii its homepage blogs from server ...');
});

app.get('/getdata', (req, res) => {
    res.send("Hii its about page from server...");
});



app.post("/login", async (req, res) => {
    const { user_email, password } = req.body;
    try {
        const user = await userModel.User.findOne({ user_email });
        
        if (user && bcrypt.compareSync(password, user.password)) {
            res.status(200).json({ message: 'Login successful' });
        } else {
            res.status(401).json({ message: 'Incorrect email or password' });
        }
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Error during login from backend' });
    }
});


const registerUser = async (req, res) => {
    const { user_email, password } = req.body;

    if (!user_email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }

    try {
        const existingUser = await userModel.User.findOne({ user_email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = bcrypt.hashSync(password, 10);
        const newUser = new userModel.User({ user_email, password: hashedPassword });

        await newUser.save();
        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        console.error('Sign-Up Error:', error);
        res.status(500).json({ message: 'Error during sign-up' });
    }
};

app.post('/signup', registerUser);
app.post('/create', registerUser);
  

app.post('/add_post', async (req, res) => {
    const { user_email, title, author, date, summary, content } = req.body;
    
    try {
        // Find the user by email
        const user = await userModel.User.findOne({ user_email });
        
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Create a new post
        const newPost = new userModel.Post({
            title,
            author,
            date: new Date(date),
            summary,
            content,
        });

        // Save the new post to the database
        await newPost.save();
        
        res.status(200).json({ message: 'Blog posted successfully' });
    } catch (error) {
        console.error('Error posting blog:', error);
        res.status(500).json({ message: 'Error posting blog' });
    }
});

  


// Global error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
