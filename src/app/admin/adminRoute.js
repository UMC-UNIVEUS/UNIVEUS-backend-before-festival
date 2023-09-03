import express from "express";
import{ getUsersInfo } from "./adminController";
import { jwtMiddleware } from "../../../config/jwtMiddleWare";
const adminRouter = express.Router();

adminRouter.get('/users-info', jwtMiddleware, getUsersInfo)

export default adminRouter;