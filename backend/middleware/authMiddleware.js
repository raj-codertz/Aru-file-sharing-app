import { UnauthenticatedError, UnauthorizedError } from "../errors/customErrors.js"
import { verifyJWT } from "../utils/tokenUtils.js"

export const authenticateUser = (req, res, next ) => {
    // console.log(req.cookies)
    const { token } = req.cookies
    console.log(token);
      if (!token) throw new UnauthenticatedError('invalid token')

    try {
      const { userId, role } = verifyJWT(token)
        req.user = { userId, role }
      next()
    } catch (error) {
        throw new UnauthenticatedError('authentication invalid')
    }
}

export const authorizePermissions = (...roles) => {
    // ...roles will return an array that we pass into it from user router
    return (req, res, next) => {
        if (!roles.includes( req.user.role)) {
            throw new UnauthorizedError('unauthorized to access this route')
        }
        next()
    }
}