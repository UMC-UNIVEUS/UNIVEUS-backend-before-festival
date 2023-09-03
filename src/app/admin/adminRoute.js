import express from "express";
import{ getUsersInfo, adminSignUp } from "./adminController";
import { jwtMiddleware } from "../../../config/jwtMiddleWare";
const adminRouter = express.Router();

adminRouter.get('/users-info', jwtMiddleware, getUsersInfo)
adminRouter.get('/signup', jwtMiddleware, adminSignUp)

export default adminRouter;