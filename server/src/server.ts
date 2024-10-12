import express from 'express'
import http from 'http'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import compression from 'compression'
import cors from 'cors'
import * as dotenv from 'dotenv'
import mongoose from 'mongoose'
import router from './router'

const app = express()

dotenv.config()

app.use(cors({
    credentials: true,
}))

app.use(compression())
app.use(cookieParser())
app.use(bodyParser.json())

const server = http.createServer(app)

server.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`)
})

mongoose.Promise = Promise
mongoose.connect(process.env.MONGODB_URL)
mongoose.connection.on('connected', () => console.log('MongoDB connected'))
mongoose.connection.on('error', (error: Error) => console.log(error))

app.use('/', router())