import { selectUser, selectUserByNickname, selectUserIdByEmail, 
    selectAlarms, selectUserById, selectUserNickNameById,
    selectUserByNickName } from "./userDao"
import pool from "../../../config/database"

/** 회원인지 확인 */
export const isUser = async(email_id) => {

    const connection = await pool.getConnection(async (conn) => conn);
    const isUser = await selectUser(connection, email_id);
    connection.release();
    return isUser.length;
}

export const isNicknameDuplicate = async(nickname) => {
    const connection = await pool.getConnection(async (conn) => conn);
    const user = await selectUserByNickname(connection, nickname);
    connection.release();
    return user.length;
}

export const getUserNickNameById = async(user_id) => {// id로 유저 닉네임 조회

    const connection = await pool.getConnection(async (conn) => conn);
    const UserNickName = await selectUserNickNameById(connection, user_id);
    connection.release();
    return UserNickName.nickname;
};

export const getUserById = async(user_id) => {// id로 유저 전체 조회

    const connection = await pool.getConnection(async (conn) => conn);
    const User = await selectUserById(connection, user_id);
    connection.release();
    return User;
};

export const getUserByNickName = async(nickname) => {// 닉네임으로 유저 전체 조회

    const connection = await pool.getConnection(async (conn) => conn);
    const User = await selectUserByNickName(connection, nickname);
    connection.release();
    return User;
};

export const getUserIdByEmail = async(email_id) => {// 이메일로 유저 id 조회

    const connection = await pool.getConnection(async (conn) => conn);
    const [UserId] = await selectUserIdByEmail(connection, email_id);
    connection.release();
    return UserId.user_id;
};

export const retrieveAlarms = async(userIdFromJWT) => {// 알림 내역 조회

    const connection = await pool.getConnection(async (conn) => conn);
    const [alarmsResult] = await selectAlarms(connection, userIdFromJWT);
    connection.release();
    return alarmsResult;
};


