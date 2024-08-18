import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { dbConnection } from "./database/dbConnection.js";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import jobRouter from "./routes/jobRouter.js";
import userRouter from "./routes/userRouter.js";
import applicationRouter from "./routes/applicationRouter.js";
import { errorMiddleware } from "./middlewares/error.js";


const app = express();
dotenv.config({path:"./config/config.env"});
// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", process.env.FRONTEND_URL); // Set the allowed origin
//   res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE"); // Set the allowed methods
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization"); // Set allowed headers
//   res.header("Access-Control-Allow-Credentials", "true"); // Allow credentials (like cookies)
  
//   // Handle preflight requests
//   if (req.method === 'OPTIONS') {
//     return res.status(200).end();
//   }

//   next();
// });
res.cookie('token', token, {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production', // Ensure cookies are only sent over HTTPS in production
  sameSite: 'None', // Allow cross-origin requests
});


app.use(
    cors({
      origin: [process.env.FRONTEND_URL],
      methods: ["GET", "POST", "DELETE", "PUT"],
      credentials: true,
    })
  );
app.options('*', cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
    fileUpload({
      useTempFiles: true,
      tempFileDir: "/tmp/",
    })
  );
  app.use("/api/v1/user", userRouter);
app.use("/api/v1/job", jobRouter);
app.use("/api/v1/application", applicationRouter);
dbConnection();


app.use(errorMiddleware);
export default app;
