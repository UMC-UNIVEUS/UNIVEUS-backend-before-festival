import { selectIsAdminByUserEmail, selectUserInfoFromUser } from "./adminDao";
import pool from "../../../config/database";

/** 관리자인지 확인 함수 */
export const isAdmin = async(userEmail) => {
    const connection = await pool.getConnection(async(conn) => conn);
    const isAdminResult = await selectIsAdminByUserEmail(connection, userEmail);
    connection.release();
    if(isAdminResult == 1) return true;
    return false;
}

export const getAllUsersInfo = async() => {
    const connection = await pool.getConnection(async(conn) => conn);
    const getUsersInfoResult = await selectUserInfoFromUser(connection);
    connection.release();
    return getUsersInfoResult;
}

/** 신고 유저 확인 함수 */
export const reportsUser = async(userEmail) => {
    const connection = await pool.getConnection(async(conn) => conn);
    const reportsUserResult = await selectUserReports(connection);
    connection.release();
    if(isAdminResult == 1) return true;
    return false;
}