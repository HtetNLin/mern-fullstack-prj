import express from 'express';
import bodyParser from 'body-parser';
import  Mongoose from 'mongoose';
import cors from 'cors';
import postRoutes from './routes/posts.js';
import userRoutes from './routes/users.js';

import dotenv from 'dotenv';

const app = express();

dotenv.config(); 

app.use(bodyParser.json({limit: "30mb", extended: true}));
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}));
app.use(cors());

app.use("/user",userRoutes);
app.use('/posts',postRoutes);

app.get('/',(req,res) => {
    res.send("hello")
})

const CONNECTION_URL = 'mongodb+srv://hnl:1234@cluster0.5jpax.mongodb.net/myFirstDatabase?retryWrites=true&w=majority '
const PORT = process.env.PORT || 5000;

Mongoose.connect(process.env.CONNECTION_URL,{useNewUrlParser:true,useUnifiedTopology:true})
.then(()=> app.listen(PORT,() => console.log(`Server is running  port: ${PORT}`)))
.catch((err)=> console.log(err.message));

