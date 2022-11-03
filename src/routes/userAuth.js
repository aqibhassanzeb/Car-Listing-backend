import express from "express";
const routes = express.Router();
import { userSignup, userLogin, } from "../apis/user.js"

routes.post('/signup', userSignup)
routes.post('/login', userLogin)


export default routes
