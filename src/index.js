import app from "./app.js";
import dotenv from "dotenv";
dotenv.config();
import connectDatabase from "./db/dbconnect.js";
const PORT = process.env.PORT;
// Database and Server Configuration
connectDatabase()
  .then(() => {
    app.listen(PORT, () => {
      console.log("Server started at PORT: ", PORT);
      app.on("error", (error) => {
        console.log("error: ", error);
        throw error;
      });
    });
  })
  .catch((error) => {
    console.log("there is error: ", error);
  });
