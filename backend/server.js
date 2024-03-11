import express from 'express';
import mongoose from 'mongoose';
import { User } from './db/user.js';
import cors from 'cors'
const app = express()
const port = 8000;
app.listen(port, () => console.log(`Server running on ${port}`))

app.get('/', (req, res) => {
    res.send('Hello World!')})

//middleware for parsing json
app.use(express.json())

//Enable cors
app.use(cors())


const connectDB = async()=>{
    try {
       await mongoose.connect(`mongodb+srv://@cluster0.uhpmz8t.mongodb.net/mydatabase`);
       console.log("connected");
    } catch (error) {
        console.log(error);
    }
}

connectDB()


//registeration
app.post('/register', async(req, res) =>{
    try {
        const {username,password} = req.body;
        console.log(req.body);
        const user = new User({ username,password });
        await user.save();
        res.status(201).send({message:'User created'});
    } catch (error) {
        res.status(500).json({error:'Registration failed'})
    }
})
//login

app.post('/login', async(req, res) =>{
    try {
        const {username, password} = req.body;
        const user =  await User.findOne({username});
        if (!user) {
            return res.status(401).json({ error: 'Invalid Username' })
        }
        if (user.password !== password) {
            return res.status(401).json({ error: 'Invalid password' })
        }
        res.status(200).send({message :'Login successfull' })
    } catch (error) {
        res.status(500).json({ error: "Error in login" })
    }
})






