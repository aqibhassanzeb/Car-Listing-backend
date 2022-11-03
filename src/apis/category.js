import { Category } from "../modals/Category.js";


export const addCateg = async (req, res) => {
  const { name } = req.body
  if (!name) {
    return res.status(422).json({ error: "please fill the name" })
  }
  const checkCateg = await Category.findOne({ name });
  if (checkCateg) {
    return res.status(422).send({ error: "Already exist" });
  }
  const Data = new Category({ name })
  try {
    const result = await Data.save()
    if (result) {
      return res.json({ message: "added successfull" })
    }
  } catch (error) {
    console.log(error)
  }
}


export const updateCateg = async (req, res) => {
  const id = req.params._id
  const { name } = req.body
  if (!id || !name) {
    return res.status(422).json({ error: "id and name is required" })
  }
  try {
    const updated = await Category.findByIdAndUpdate(req.params._id, { name });
    return res.status(200).json({ message: "updated successfully" });

  } catch (error) {
    console.log(error)
  }
}


export const deleteCateg = async (req, res) => {
  const id = req.params._id
  if (!id) {
    return res.status(422).json({ error: "id is required" })
  }
  try {
    const result = await Category.findByIdAndDelete(req.params._id);
    return res.status(200).json({ message: "deleted successfully" });

  } catch (error) {
    console.log(error)
  }
}


export const showCateg = async (req, res) => {
  try {
    const result = await Category.find()
    return res.status(200).json({ Category: result });

  } catch (error) {
    console.log(error)
  }
}


export const fetchCategbyId = async (req, res) => {
  try {
    let _id = req.params._id
    const result = await Category.findById({ _id })
    return res.status(200).json({ Category: result });

  } catch (error) {
    console.log(error)
  }
}
