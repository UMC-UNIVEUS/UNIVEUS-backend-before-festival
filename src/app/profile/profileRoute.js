/*Request에서 보낸 라우팅 처리*/

import express from 'express';
import {
    getUserProfile,
    putUserProfile,
    getUserMyUnive,
    getUserParticipate
} from "./profileController";

const profileRouter = express.Router();

profileRouter.get('/profile/:user_id', getUserProfile);
profileRouter.put('/profile/:user_id', putUserProfile);
profileRouter.get('profile/myunive/:user_id', getUserMyUnive);
profileRouter.get('profile/participate/:user_id', getUserParticipate);
export default profileRouter;