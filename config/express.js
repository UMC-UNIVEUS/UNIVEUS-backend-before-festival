/*express Framework 설정만 해주는 파일 */
import express from "express";   
import cors from "cors";
import compression from "compression";
import methodOverride from "method-override";
import dotenv from "dotenv";
import userRouter from "../src/app/user/userRoute";
import postRouter from "../src/app/post/postRoute";
import commentRouter from "../src/app/comment/commRoute";
import reportRouter from "../src/app/report/reportRoute";


const app = express();  

dotenv.config();

app.use(compression()); 
app.use(express.json());   
app.use(express.urlencoded({extended:true}));
app.use(methodOverride());
app.use(cors());


app.use('/user', userRouter);
app.use('/post',postRouter);
app.use('/comments',commentRouter);
app.use('/report', reportRouter);

app.use('/mypage', userRouter);

export default app;