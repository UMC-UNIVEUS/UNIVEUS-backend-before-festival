/*Request에서 보낸 라우팅 처리*/

import express from 'express';
import {
    getUserDefaultProfile,
    getUserIntroProfile,
    postUserIntroProfile
} from "./userController";

const userRouter = express.Router();

userRouter.get('/profile/:id', getUserDefaultProfile);
userRouter.get('/profile/:id', getUserIntroProfile);
// userRouter.post('/profile/:id', postUserIntroProfile)

export default userRouter;