// General Error Handling
const errorHandler = (err, req, res, next) => {
    console.log(err.stack)

    const status = err.status || 500

    res.status(status).json({
        status: status,
        message: "Something went wrong",
        error: err.message
    })
}

export default errorHandler