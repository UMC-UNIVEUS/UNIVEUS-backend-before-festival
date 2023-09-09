/*Request에서 보낸 라우팅 처리*/

import express from 'express';
import {
    //getUserProfile,
    //putUserProfile,
    getUserMyUnive,
    getUserParticipate, getUserProfile
} from "./profileController";
import { jwtMiddleware } from "../../../config/jwtMiddleWare";
const profileRouter = express.Router();

//profileRouter.get('/profile/:user_id', getUserProfile);
//profileRouter.put('/profile/:user_id', putUserProfile);
profileRouter.get('/', jwtMiddleware, getUserProfile);
profileRouter.get('/myunive', jwtMiddleware, getUserMyUnive);
profileRouter.get('/participate', jwtMiddleware, getUserParticipate);

export default profileRouter;