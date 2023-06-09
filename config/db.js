import mongoose from "mongoose";
import colors from "colors";


const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URL); // connection object
        console.log(` >> Connected to Mongodb Database >> Host: ${conn.connection.host} `.bgGreen.black);
    } catch (error) {
        console.log(` >> Error in connection ${error} `.bgRed.black);
    }
};

export default connectDB;