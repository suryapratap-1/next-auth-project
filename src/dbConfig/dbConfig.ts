import mongoose from "mongoose";

export default async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGODB_URI!)
        const connection = mongoose.connection
        connection.on('connection', () => {
            console.log('MongoDB connected successfully')
        })
        connection.on('error', (err) => {
            console.log('MongoDB connection error, Please make sure MongoDB is running. ' + err)
            process.exit(1)
        })
    } catch (error) {
        console.log('Database connection failed.')
        console.log(error)
    }
}