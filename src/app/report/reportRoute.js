import express from "express";
import { reportUser, reportPost } from "./reportController";
import { jwtMiddleware } from "../../../config/jwtMiddleWare";
const reportRouter = express.Router();

reportRouter.post("/user", jwtMiddleware, reportUser);
reportRouter.post("/post", jwtMiddleware, reportPost);

export default reportRouter;