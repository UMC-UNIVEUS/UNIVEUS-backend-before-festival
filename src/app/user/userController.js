/* Request를 처리하고 Response 해주는 곳 */

import { response, errResponse, baseResponse } from "../../../config/response";

import {
    showUserDefaultProfile,
    showUserIntroProfile
} from './userProvider';


export const getUserProfile = async (req, res) => {
    const {id} = req.params;
    // 빈 아이디 체크
    if (!id) return res.send(errResponse(baseResponse.USER_USERID_EMPTY));
    try {
        const getDefaultResponse = await showUserDefaultProfile(id, 0);
        if(!getDefaultResponse[0]) {
            return res.status(404).json(response(baseResponse.PROFILE_INFO_NOT_EXIST))
        };
        const getIntroResponse = await showUserIntroProfile(id, 0);
        if(!getIntroResponse[0]) {
            return res.status(404).json(response(baseResponse.PROFILE_INFO_NOT_EXIST))
        };
        const getAllResponse = {getDefaultResponse, getIntroResponse};
        return res.status(200).json(response(baseResponse.SUCCESS, getAllResponse));
    }
    catch(error){
            return res.status(500).json(errResponse(baseResponse.SERVER_ERROR));
        }
};


    export const postProfile = async (req, res) => {
    const defaultInfo = {
        nickname: req.body.nickname,
        user_id: req.body.user_id,
        gender: req.body.gender,

    };
};