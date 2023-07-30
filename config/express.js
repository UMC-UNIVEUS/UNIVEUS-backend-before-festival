/*express Framework 설정만 해주는 파일 */
import express from "express";   
import cors from "cors";
import compression from "compression";
import methodOverride from "method-override";
import postRouter from "../src/app/post/postRoute";
import commentRouter from "../src/app/comment/commRoute";
import profileRouter from "../src/app/profile/profileRoute";
const app = express();  


app.use(compression()); 
app.use(express.json());   
app.use(express.urlencoded({extended:true}));
app.use(methodOverride());
app.use(cors());

app.use('/post',postRouter);
app.use('/comments',commentRouter);
app.use('/mypage', profileRouter);

export default app;