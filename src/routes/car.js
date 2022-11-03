import express from "express";
import { addCar, deleteCar, fetchCarbyId, showCar, updateCar } from "../apis/cars.js";
import { protect } from "../middleware/user-middleware.js";
const routes = express.Router();


routes.post('/addcar', protect, addCar)
routes.get('/cars', protect, showCar)
routes.put('/updatecar/:_id', protect, updateCar)
routes.delete('/car/:_id', protect, deleteCar)
routes.get('/fetchbyidcar/:_id', protect, fetchCarbyId)


export default routes