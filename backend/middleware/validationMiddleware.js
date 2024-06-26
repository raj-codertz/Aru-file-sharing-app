import { body, param, validationResult} from "express-validator"
import {BadRequestError, NotFoundError, UnauthorizedError} from "../errors/customErrors.js"
import mongoose from "mongoose"
import User from "../models/userModel.js"

// first creating a function that return errors
const withValidationErrors = validateValues => {
    //since i have two things validate values and the middleware, in express js we can group them together using an array
    return [validateValues, (req, res, next) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            const errorMessage = errors.array().map( error => error.msg )
            if (errorMessage[0].startsWith('no orphanage')) {
                throw new NotFoundError(errorMessage)
            }
            if (errorMessage[0].startsWith('not authorized')) {
                throw new UnauthorizedError(' not authorized to access the route')
            }
            throw new BadRequestError(errorMessage)
        }
        next()
    }
   ]
}


export const validateIdParam = withValidationErrors([
    param('id').custom(async (value, { req }) => {
        const isValidId  =  mongoose.Types.ObjectId.isValid(value)
        if (!isValidId) throw new BadRequestError('invalid MongoDB id')
        // const orphanage = await Organization.findById(value)
        // if (!orphanage) throw new NotFoundError(`no orphanage with id ${value}`)
        const isAdmin = req.user.role === 'Admin'
        const isOwner = req.user.userId === Organization.createdBy.toString()
        if (!isAdmin && !isOwner) throw new UnauthorizedError(' not authorized to access the route')
    })

])

export const validateRegisterInput = withValidationErrors([
    body('firstName').notEmpty().withMessage('name is required'),
    body('email').notEmpty().withMessage('email is required').isEmail().withMessage('invalid email format').custom( async email => {
        const user = await User.findOne({ email })
        if (user) {
            throw new BadRequestError('email already exists')
        }
    }),
    body('password').notEmpty().withMessage('password is required').isLength({ min: 8}).withMessage('password must be at least 8 characters long'),
   body('lastName').notEmpty().withMessage('last name is required')
   ])

export const validateLoginInput = withValidationErrors([
    body('email').notEmpty().withMessage('email is required').isEmail().withMessage('invalid email format'),
    body('password').notEmpty().withMessage('password is required')
])