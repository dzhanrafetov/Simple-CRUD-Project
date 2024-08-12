import mongoose from 'mongoose'
export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI as string);
  } catch (error) {
    console.error("Error");
    process.exit(1)
  }


}