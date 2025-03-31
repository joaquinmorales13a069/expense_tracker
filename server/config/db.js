import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {});
        console.log("MongoDB connected");
    }catch (e) {
        console.log('MongoDB connection error:', e);
        process.exit(1);
    }
}

export default connectDB;