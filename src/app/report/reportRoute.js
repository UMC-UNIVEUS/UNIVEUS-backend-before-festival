import express from "express";
import { reportUser } from "./reportController";
import { jwtMiddleware } from "../../../config/jwtMiddleWare";
const reportRouter = express.Router();

reportRouter.post("/user", jwtMiddleware, reportUser);

export default reportRouter;