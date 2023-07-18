/*Request에서 보낸 라우팅 처리*/

import express from 'express';
import {
    getUserProfile,
    postUserIntroProfile
} from "./userController";

const userRouter = express.Router();

userRouter.get('/profile/:id', getUserProfile);
// userRouter.post('/profile/:id', postUserIntroProfile)

export default userRouter;