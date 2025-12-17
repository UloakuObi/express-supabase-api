import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import router from "./routes/userRoutes.js"
import errorHandler from "./middleware/errorHandler.js"

dotenv.config()

const app = express()
const port = process.env.PORT || 3000

// Middleware
app.use(express.json())
app.use(cors())

// Routes
app.use("/api", router)

// Error Handler
app.use(errorHandler)

// Server Running
app.listen(port, () => {
    console.log(`Listening on Port ${port}`)
})

