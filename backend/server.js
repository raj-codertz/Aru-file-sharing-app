import 'express-async-errors';
import cookieParser from 'cookie-parser'
import morgan from 'morgan';
import * as dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import errorHandlerMiddleware from "./middleware/errorHandlerMiddleware.js";
import { connectDB } from "./database/db.js";
const app = express();

// Routers
import authRouter from './routes/authRouter.js'
import userRouter from './routes/userRouter.js'
import fileRouter from './routes/fileRouter.js'


// Middleware
import { authenticateUser } from './middleware/authMiddleware.js';

if ( process.env.NODE_ENV === "development") {
   app.use(morgan('dev'))
}

app.use(cookieParser())
app.use(express.json())
app.use("/uploads",express.static("uploads"))

app.use('/api/v1/auth', authRouter)
app.use('/api/v1/user', authenticateUser, userRouter)
app.use('/api/v1/file', authenticateUser, fileRouter)



app.use('*', (req, res) => {
    res.status(404).json({ msg: 'Not Found' })
})

app.use( errorHandlerMiddleware )

const port = process.env.PORT || 5500

connectDB().then(r => app.listen(port, () => {
    console.log(` Server is running on PORT ${port}...`)
}) )