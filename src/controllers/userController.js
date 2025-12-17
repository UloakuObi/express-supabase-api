import { createUserService, 
        getAllUsersService, 
        updateUserService, 
        deleteUserService, 
        patchUpdateUserService} from "../services/usersService.js"


// Standardized Response Structure
const handleResponse = (res, status, message, data=null) => {
    res.status(status).json({
        status,
        message,
        data
    })
}

// Helper function for PATCH
const pickAllowedFields = (reqBody, allowedFields) => {
    return Object.fromEntries(
      Object.entries(reqBody).filter(
        ([key, value]) =>
          allowedFields.includes(key) && value !== undefined
      )
    )
  }
  

// User Controllers
export const createUser = async (req, res, next) => {
    const { name, email } = req.body

    try {
        const newUser = await createUserService(name, email)
        handleResponse(res, 201, "User created successfully", newUser)
    } catch(err) {
        next(err)
    }
}

export const getAllUsers = async (req, res, next) => {
    try {
        const users = await getAllUsersService()
        handleResponse(res, 200, "Users fetched successfully", users)
    } catch(err) {
        next(err)
    }
}

export const getUserById = async (req, res, next) => {
    const { id } = req.params.id

    try {
        const user = await getUserByIdService(id)
        
        if (!user) {
            return handleResponse(res, 404, "User not found!")
        }
        handleResponse(res, 200, "User fetched successfully", user)

    } catch(err) {
        next(err)
    }
}

export const updateUser = async (req, res, next) => {
    const { name, email } = req.body
    try {
        const updatedUser = await updateUserService(req.params.id, name, email)

        if(!updatedUser) {
            return handleResponse(res, 404, "User not found")
        }
        handleResponse(res, 201, "User updated successfully", updatedUser)

    } catch(err) {
        next(err)
    }
}

export const patchUpdateUser = async (req, res, next) => {

    try {
        const allowedFields = ["name", "email"]

        const updates = pickAllowedFields(req.body, allowedFields)

        if (Object.keys(updates).length === 0) {
            return res.status(400).json({ message: "No fields to update" })
        }

        const updatedUser = await patchUpdateUserService(req.params.id, updates)

        if (!updatedUser) {
            return handleResponse(res, 404, "User not found!")
        }

        handleResponse(res, 200, "User updated successfully", updatedUser)

    } catch(err) {
        next(err)
    }
    
}

export const deleteUser = async (req, res, next) => {

    try {
        const deletedUser = await deleteUserService(req.params.id)

        if(!deleteUser) {
            return handleResponse(res, 404, "User not found")
        }
        handleResponse(res, 201, "User deleted successfully", deleteUser)

    } catch(err) {
        next(err)
    }
}