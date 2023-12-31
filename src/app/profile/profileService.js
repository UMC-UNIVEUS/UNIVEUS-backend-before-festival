import pool from '../../../config/database';
import { response, errResponse, baseResponse } from "../../../config/response";
import {
    userIdCheck
} from "./profileProvider";
import {modifyProfilebyId, selectUserProfilebyId} from "./profileDao";


// 기존에 있던 프로필 소개 정보를 수정하는 API
export const ModifyIntroProfile = async (defaultInfo, detailInfo, user_id) => {
    // user가 존재하는지 체크
    const userExist = await userIdCheck(user_id);
    if (!userExist[0][0]) {
        return errResponse(baseResponse.USER_USERID_NOT_EXIST);
    }
    const connection = await pool.getConnection(async (conn) => conn);
    const modifyprofilebyIdResult = modifyProfilebyId(connection, [
        defaultInfo.nickname,
        defaultInfo.gender,
        defaultInfo.profile_img,
        detailInfo.interest,
        detailInfo.introduce,
        user_id
    ]);

    connection.release();
    return response(baseResponse.SUCCESS);
};


