import mongoose from "mongoose"
import * as dotenv from "dotenv"

dotenv.config()
mongoose.Promise = global.Promise

export const dbConnect = async () =>  {
    try {
        await mongoose.connect(process.env.MONGODB_URL as string)
        console.log("✅ MongoDB Connected")
    } catch (error) {
        console.error("❌ Error connecting to MongoDB:", error)
    }
}

export const dbDisconnect = async () => {
    await mongoose.connection.close()
    console.log('✅ MongoDB connection closed')
}
