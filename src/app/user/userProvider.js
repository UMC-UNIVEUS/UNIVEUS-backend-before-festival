import pool from '../../../config/database';
import {
    selectUserbyId,
    selectUserDefaultProfilebyId,
    selectUserIntroProfilebyId
} from './userDao';
import {baseResponse, response} from "../../../config/response";

export const userIdCheck = async (user_id) => {
    const connection = await pool.getConnection(async (conn) => conn);
    const userIdCheckResult = selectUserbyId(connection, user_id);
    connection.release();
    return userIdCheckResult;
};


// 프로필 화면에서 상단에 위치하는 유저 기본 정보 프로필 내용을 불러오는 API
export const showUserDefaultProfile= async (user_id) => {
    const connection = await pool.getConnection(async (conn) => conn);
    const showUserDefaultProfileResult = await selectUserDefaultProfilebyId(connection, user_id);
    connection.release();
    if(showUserDefaultProfileResult[0]) {
        return showUserDefaultProfileResult[0];
    } else {
        return response(baseResponse.PROFILE_INFO_NOT_EXIST);
    }
};


// 프로필 화면에서 하단에 위치하는 유저 소개 정보 프로필 내용을 불러오는 API
export const showUserIntroProfile = async (user_id) => {
    const connection = await pool.getConnection(async (conn) => conn);
    const showUserIntroProfileResult = await selectUserIntroProfilebyId(connection, user_id);
    connection.release();
    if(showUserIntroProfileResult[0]) {
        return showUserIntroProfileResult[0];
    } else {
        return response(baseResponse.PROFILE_INFO_NOT_EXIST);
    }
};

