import express from "express"
import { getAllUsers, 
        getUserById, 
        createUser, 
        updateUser, 
        deleteUser } from "../controllers/userController.js"
import validateInput from "./middleware/inputValidator.js"

const router = express.Router()

// GET Requests
router.get("/users", getAllUsers)
router.get("/users/:id", getUserById)

// POST Request
router.post("/users", validateInput, createUser)

// PUT Request
router.put("/users/:id", validateInput, updateUser)

// DELETE Request
router.delete("/users/:id", deleteUser)

export default router
