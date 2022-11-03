import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';
import Auth from "./routes/userAuth.js";
import Categ from "./routes/category.js";
import Car from "./routes/car.js";
import './config.js'
dotenv.config();
const app = express();

//middelwares
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.json());
app.use(bodyParser.json())
app.use(cors({
    origin: true,
    credentials: true,
    defaultErrorHandler: false,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));

// api's routes 

app.use('/api/v1', Auth, Categ, Car)


app.use('*', (req, res) => {
    return res.json({
        message: 'Backend is runing..'
    })
});

//Port
const port = process.env.PORT || 3333;
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});

