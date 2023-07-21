/* Request를 처리하고 Response 해주는 곳 */

import { response, errResponse, baseResponse } from "../../../config/response";

import {
    showUserDefaultProfile,
    showUserIntroProfile
} from './userProvider';
import {
    ModifyIntroProfile
} from "./userService";


export const getUserProfile = async (req, res) => {
    const {user_id} = req.params;
    // 빈 아이디 체크
    if (!user_id) return res.send(errResponse(baseResponse.USER_USERID_EMPTY));
        const getDefaultResponse = await showUserDefaultProfile(user_id, 0);
        const getIntroResponse = await showUserIntroProfile(user_id, 0);
    if(!getDefaultResponse[0]) { // default 프로필 정보가 없음을 응답.
        return res.status(404).json(errResponse(baseResponse.PROFILE_DEFAULT_INFO_NOT_EXIST));
    } else if(!getIntroResponse[0]) { // intro 프로필 정보가 없음을 응답.
            return res.status(404).json(errResponse(baseResponse.PROFILE_INTRO_INFO_NOT_EXIST)); // intro 프로필 정보가 없음을 응답.
    } else { // 프로필 정보 둘 다 존재하는 경우.
        const getAllResponse = {getDefaultResponse, getIntroResponse};
        return res.status(200).json(response(baseResponse.SUCCESS, getAllResponse));
    }
};


    export const putUserProfile = async (req, res) => {
        //아직은 user_id를 확인할 방법이 없어 파라미터로 받음.
        const {user_id} = req.params;
        // 빈 아이디 체크
        if (!user_id) return res.send(errResponse(baseResponse.USER_USERID_EMPTY));
    const defaultInfo = {
        nickname: req.body.nickname,
        gender: req.body.gender,
        profile_img: req.body.profile_img
    };
    // 닉네임 길이 체크(일단 db 설계할 땐 30자로 해놨더라고요.)
    if (defaultInfo.nickname.length > 90) {
        return res.send(errResponse(baseResponse.USER_USER_NICKNAME_LENGTH));
    };

    const detailInfo = {
        interest: req.body.interest,
        introduce: req.body.introduce
    };
    const putUserProfileResponse = await ModifyIntroProfile(defaultInfo, detailInfo, user_id);
    return res.send(putUserProfileResponse);
};