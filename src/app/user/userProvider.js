import pool from '../../../config/database';
import {
    selectUserDefaultProfilebyId,
    selectUserIntroProfilebyId
} from './userDao';
import {baseResponse, response} from "../../../config/response";

export const showUserDefaultProfile= async (user_id) => {
    const connection = await pool.getConnection(async (conn) => conn);
    const showUserDefaultProfileResult = await selectUserDefaultProfilebyId(connection, user_id);
    connection.release();
    if(showUserDefaultProfileResult[0]) {
        return response(baseResponse.SUCCESS, showUserDefaultProfileResult[0]);
    } else {
        return response(baseResponse.PROFILE_INFO_NOT_EXIST);
    }
};



export const showUserIntroProfile = async (user_id) => {
    const connection = await pool.getConnection(async (conn) => conn);
    const showUserIntroProfileResult = await selectUserIntroProfilebyId(connection, user_id);
    connection.release();
    if(showUserIntroProfileResult[0]) {
        return response(baseResponse.SUCCESS, showUserIntroProfileResult[0]);
    } else {
        return response(baseResponse.PROFILE_INFO_NOT_EXIST);
    }
};

