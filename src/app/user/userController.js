/* Request를 처리하고 Response 해주는 곳 */

import { response, errResponse, baseResponse } from "../../../config/response";

import { showUserProfile } from './userProvider';


export const getUserProfileListAll = async (req, res) => {
    const {id} = req.params;

    // 빈 아이디 체크
    if (!id) return res.send(errResponse(baseResponse.USER_USERID_EMPTY));

    const getListResponse = await showUserProfile(id, 0);
    return res.send(getListResponse);
};


