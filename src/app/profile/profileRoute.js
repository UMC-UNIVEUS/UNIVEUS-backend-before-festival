/*Request에서 보낸 라우팅 처리*/

import express from 'express';
import {
    //getUserProfile,
    //putUserProfile,
    getUserMyUnive,
    getUserParticipate, getUserProfile,getUserMyScrap
} from "./profileController";
import { jwtMiddleware } from "../../../config/jwtMiddleWare";
import {wrapAsync} from "../../../config/errorhandler";
const profileRouter = express.Router();

//profileRouter.get('/profile/:user_id', getUserProfile);
//profileRouter.put('/profile/:user_id', putUserProfile);
profileRouter.get('/', jwtMiddleware, wrapAsync(getUserProfile));
profileRouter.get('/myunive', jwtMiddleware, wrapAsync(getUserMyUnive));
profileRouter.get('/myscrap', jwtMiddleware, wrapAsync(getUserMyScrap));
profileRouter.get('/participate', jwtMiddleware, wrapAsync(getUserParticipate));

export default profileRouter;