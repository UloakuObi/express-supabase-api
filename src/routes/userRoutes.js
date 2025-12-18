import express from "express"
import { getAllUsers, 
        getUserById, 
        createUser, 
        updateUser, 
        deleteUser,
        patchUpdateUser } from "../controllers/userController.js"
import validateInput from "../middleware/inputValidator.js"
import { userPatchSchema, userPutSchema } from "../middleware/inputValidator.js"

const router = express.Router()

// GET Requests
router.get("/users", getAllUsers)
router.get("/users/:id", getUserById)

// POST Request
router.post("/users", validateInput, createUser)

// PUT Request
router.put("/users/:id", validateInput(userPutSchema), updateUser)

// PATCH Request
router.patch("/users/:id", validateInput(userPatchSchema), patchUpdateUser)

// DELETE Request
router.delete("/users/:id", deleteUser)

export default router
