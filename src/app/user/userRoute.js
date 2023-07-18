/*Request에서 보낸 라우팅 처리*/

import express from 'express';
import { getUserProfileListAll } from "./userController";

const userRouter = express.Router();

userRouter.get('/profile/:id', getUserProfileListAll);

export default userRouter;