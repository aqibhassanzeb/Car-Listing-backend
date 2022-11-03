import express from "express";
import { addCateg, deleteCateg, fetchCategbyId, showCateg, updateCateg } from "../apis/category.js";
const routes = express.Router();
import { protect } from "../middleware/user-middleware.js"

routes.post('/addcategory', protect, addCateg)
routes.get('/category', protect, showCateg)
routes.put('/updatecategory/:_id', protect, updateCateg)
routes.get('/fetchbyidcategory/:_id', protect, fetchCategbyId)
routes.delete('/category/:_id', protect, deleteCateg)

export default routes