import { Car } from "../modals/Car.js";


// Add new car 

export const addCar = async (req, res) => {
  
  const { name, colour, model, registerationNo, type } = req.body
  if (!name || !colour || !model || !registerationNo || !type) {
    return res.status(422).json({ error: "please fill all fields" })
  }
  try {
    const checkCar = await Car.findOne({ name, colour, model, registerationNo, type });
    if (checkCar) {
      return res.status(422).send({ error: "Already exist" });
    }
    const Data = new Car({ name, colour, model, registerationNo, type })
    const result = await Data.save()
    if (result) {
      return res.json({ message: "added successfull" })
    }
  } catch (error) {
    console.log(error)
  }
}

// update car 

export const updateCar = async (req, res) => {
  const id = req.params._id
  const { name, colour, model, registerationNo, type } = req.body
  if (!name || !colour || !model || !registerationNo || !type) {
    return res.status(422).json({ error: "please fill all fields" })
  }
  try {
    const updated = await Car.findByIdAndUpdate(req.params._id, { name, colour, model, registerationNo, type });
    return res.status(200).json({ message: "updated successfully" });

  } catch (error) {
    console.log(error)
  }
}

// delete car 

export const deleteCar = async (req, res) => {
  const id = req.params._id
  if (!id) {
    return res.status(422).json({ error: "id is required" })
  }
  try {
    const result = await Car.findByIdAndDelete(req.params._id);
    return res.status(200).json({ message: "deleted successfully" });

  } catch (error) {
    console.log(error)
  }
}

// show car and filter 

export const showCar = async (req, res) => {
  try {
    if (req.query.type == "All") {

      const result = await Car.find().populate("type", "name")
      return res.status(200).json({ cars: result });
    } else {
      let filter = {}
      if (req.query.type) {
        filter = { type: req.query.type.split(',') }
        const result = await Car.find(filter).populate("type", "name")
        return res.status(200).json({ cars: result });
      }
    }

  } catch (error) {
    console.log(error)
  }
}

// show specific car by id 

export const fetchCarbyId = async (req, res) => {
  try {
    let _id = req.params._id
    const result = await Car.findById({ _id }).populate("type", "name")
    return res.status(200).json({ Car: result });

  } catch (error) {
    console.log(error)
  }
}