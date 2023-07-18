/*데이터베이스와 상호작용하여 사용자 관련 기능을 수행
(CRUD에 해당하는 서버 로직 처리) */

import pool from '../../../config/database';
import { response, errResponse, baseResponse } from "../../../config/response";
import { showUserProfile } from "./userProvider";
import { selectUserProfilebyId } from "./userDao";
/*
export const viewprofile = async (id) => {
    const profileUser = await showUserProfile(id);
    if (!profileUser[0][0]) {
        return errResponse(baseResponse.USER_USERID_NOT_EXIST);
    }
    const connection = await pool.getConnection(async (conn) => conn);
    const selectUserProfilebyIdResult = selectUserProfilebyId(connection, id);

    connection.release();
    return response(baseResponse.SUCCESS, selectUserProfilebyIdResult[0]);
};
*/



