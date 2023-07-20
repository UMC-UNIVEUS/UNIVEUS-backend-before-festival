/*express Framework 설정만 해주는 파일 */
import express from "express";   
import cors from "cors";
import compression from "compression";
import methodOverride from "method-override";
import postRouter from "../src/app/post/postRoute";


const app = express();  


app.use(compression()); 
app.use(express.json());   
app.use(express.urlencoded({extended:true}));
app.use(methodOverride());
app.use(cors());

app.use('/post',postRouter);

export default app;