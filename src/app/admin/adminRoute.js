import express from "express";
import{ getUsersInfo, adminSignUp, userReports, postReports } from "./adminController";
import { jwtMiddleware } from "../../../config/jwtMiddleWare";
const adminRouter = express.Router();

adminRouter.get('/users-info', jwtMiddleware, getUsersInfo)
adminRouter.get('/signup', jwtMiddleware, adminSignUp)
adminRouter.get('/user-reports', jwtMiddleware, userReports);
adminRouter.get('/post-reports', jwtMiddleware, postReports);

export default adminRouter;