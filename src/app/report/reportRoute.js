import express from "express";
import { reportUser, reportPost } from "./reportController";
import { jwtMiddleware } from "../../../config/jwtMiddleWare";
import { accountStatusMiddleware } from "../../../config/accountStatusMiddleware";

const reportRouter = express.Router();

reportRouter.use(jwtMiddleware);
// reportRouter.use(accountStatusMiddleware);

reportRouter.post("/user", reportUser);
reportRouter.post("/post", reportPost);

export default reportRouter;