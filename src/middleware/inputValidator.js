import Joi from "joi"

export const userSchema = Joi.object({
    name: Joi.string().min(2).required(),
    email: Joi.string().email().required()
})


export const userPatchSchema = Joi.object({
    name: Joi.string().min(2),
    email: Joi.string().email()
}).min(1) // <-- at least one field required to prevent empty patch requests


export default function validateInput(schema) {
    return function (req, res, next) {
        const { error } = schema.validate(req.body, {
            abortEarly: true,
            stripUnknown: true // Removes unknown fields from req.body
        })

        if (error) {
            return res.status(400).json({
                status: 400,
                message: error.details[0].message
            })
        }

        next()
    }
}

