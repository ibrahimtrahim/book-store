import express from "express";
import mongoose, { trusted } from "mongoose";
import bookRoute from "./routes/booksRoute.js";
import {PORT, mongoDBURL} from './config.js';
import cors from 'cors';

const app = express()

// Middleware for parsing request body
app.use(express.json());

// Middleware for handling CORS policy
app.use(cors());

app.get('/', (req, res) => {
    console.log(req)
    return res.send('Hello World!')
})

app.use('/books', bookRoute);


mongoose.connect(mongoDBURL)
.then(() => {
  console.log('App connected to DB')
  app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`)
  })
}).catch((err) => {
  console.log(err)
});