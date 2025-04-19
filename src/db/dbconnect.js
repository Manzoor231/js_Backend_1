import mongoose from "mongoose";

const connectDatabase = async () => {
  try {
    const connectionInstance = await mongoose.connect(process.env.MONG_URL);
    console.log(
      `Database is connected Succesfully at host:${connectionInstance.connection.host}`
    );
  } catch (error) {
    console.log("Database Error: ", error.message);
    process.exit(1);
  }
};
export default connectDatabase;
