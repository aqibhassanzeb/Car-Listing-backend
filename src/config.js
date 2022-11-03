import mongoose from "mongoose"
import dotenv from 'dotenv'
dotenv.config();

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('database connected.')
  })
  .catch((err) => console.log(err.message))


