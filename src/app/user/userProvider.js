import { selectUser, selectUserByNickname, selectUserIdByEmail } from "./userDao"
import pool from "../../../config/database"

export const isUser = async(email_id) => {

    const connection = await pool.getConnection(async (conn) => conn);
    const isUser = await selectUser(connection, email_id);
    return isUser.length;
}

export const isNicknameDuplicate = async(nickname) => {
    const connection = await pool.getConnection(async (conn) => conn);
    const user = await selectUserByNickname(connection, nickname);
    return user.length;
}

export const getUserIdByEmail = async(email_id) => {// 이메일로 유저 id 조회

    const connection = await pool.getConnection(async (conn) => conn);
    const [UserId] = await selectUserIdByEmail(connection, email_id);
    return UserId.user_id;
}
