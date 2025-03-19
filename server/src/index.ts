import express, { Request, Response } from 'express'
import http from 'http'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import compression from 'compression'
import cors from 'cors'
import * as dotenv from 'dotenv'
import router from './router'
import { dbConnect } from './utils/db'

const app = express()

dotenv.config()

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}))

app.use(compression())
app.use(cookieParser())
app.use(bodyParser.json())

const server = http.createServer(app)

server.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`)
})

// connect to database 
dbConnect()

app.use('/', router())
app.get('/', (_req: Request, res: Response) => { res.status(200).json({ message: "Hello World" }) })