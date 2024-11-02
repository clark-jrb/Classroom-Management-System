import mongoose from "mongoose"

mongoose.Promise = global.Promise

export const dbConnect = async () =>  {
    try {
        await mongoose.connect(process.env.MONGODB_URL)
        console.log("MongoDB Connected")
    } catch (error) {
        console.error("Error connecting to MongoDB:", error)
    }
}

mongoose.connection.on("error", (error) => {
    console.error("MongoDB connection error:", error);
});
