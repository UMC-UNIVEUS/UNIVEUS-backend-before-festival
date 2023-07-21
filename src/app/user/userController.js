/* Request를 처리하고 Response 해주는 곳 */

import { response, errResponse, baseResponse } from "../../../config/response";

import {
    showUserDefaultProfile,
    showUserIntroProfile
} from './userProvider';


export const getUserProfile = async (req, res) => {
    const {user_id} = req.params;
    // 빈 아이디 체크
    if (!user_id) return res.send(errResponse(baseResponse.USER_USERID_EMPTY));
        const getDefaultResponse = await showUserDefaultProfile(user_id, 0);
        const getIntroResponse = await showUserIntroProfile(user_id, 0);
    if(getDefaultResponse.isSuccess == false) { // default 프로필 정보가 없음을 응답.
        return res.status(404).json(errResponse(baseResponse.PROFILE_DEFAULT_INFO_NOT_EXIST));
    } else if(getIntroResponse.isSuccess == false) { // intro 프로필 정보가 없음을 응답.
            return res.status(404).json(errResponse(baseResponse.PROFILE_INTRO_INFO_NOT_EXIST)); // intro 프로필 정보가 없음을 응답.
    } else { // 프로필 정보 둘 다 존재하는 경우.
        const getAllResponse = {getDefaultResponse, getIntroResponse};
        return res.status(200).json(response(baseResponse.SUCCESS, getAllResponse));
    }
};


    export const postProfile = async (req, res) => {
    const defaultInfo = {
        nickname: req.body.nickname,
        user_id: req.body.user_id,
        gender: req.body.gender,

    };
};