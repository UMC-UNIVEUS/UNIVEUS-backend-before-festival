/* Request를 처리하고 Response 해주는 곳 */

import { response, errResponse, baseResponse } from "../../../config/response";

import {
    showUserDefaultProfile,
    showUserIntroProfile
} from './userProvider';


export const getUserDefaultProfile = async (req, res) => {
    const {id} = req.params;

    // 빈 아이디 체크
    if (!id) return res.send(errResponse(baseResponse.USER_USERID_EMPTY));
    const getDefaultResponse = await showUserDefaultProfile(id, 0);
    const getIntroResponse = await showUserIntroProfile(id, 0);
    const getAllResponse = {getDefaultResponse, getIntroResponse};
    return res.send(getAllResponse);
};

export const getUserIntroProfile = async (req, res) => {
    const {id} = req.params;

    if (!id) return res.send(errResponse(baseResponse.USER_USERID_EMPTY));
    const getIntroResponse = await showUserIntroProfile(id, 0);
    return res.send(getIntroResponse);
};

    export const postProfile = async (req, res) => {
    const defaultInfo = {
        nickname: req.body.nickname,
        user_id: req.body.user_id,
        gender: req.body.gender,

    };
};