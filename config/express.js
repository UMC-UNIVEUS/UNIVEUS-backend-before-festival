/*express Framework 설정만 해주는 파일 */
import express from "express";   
import cors from "cors";
import compression from "compression";
import methodOverride from "method-override";
import dotenv from "dotenv";
import userRouter from "../src/app/user/userRoute";

const app = express();  

dotenv.config();

app.use(compression()); 
app.use(express.json());   
app.use(express.urlencoded({extended:true}));
app.use(methodOverride());
app.use(cors());

app.use('/user', userRouter);




export default app;