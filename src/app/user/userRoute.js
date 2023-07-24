/*Request에서 보낸 라우팅 처리*/

import express from 'express';
import {
    getUserProfile,
    putUserProfile
} from "./userController";

const userRouter = express.Router();

userRouter.get('/profile/:user_id', getUserProfile);
userRouter.put('/profile/:user_id', putUserProfile);
export default userRouter;