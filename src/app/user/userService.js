import { insertToken, insertAuthUser, updateAlarms } from "./userDao"
import pool from "../../../config/database"

// export const createUser = async(userEmail) => {
//     try {
//         const connection = await pool.getConnection(async conn => conn);
//         const createUserResult = await insertUser(connection,userEmail);
//         connection.release();
//         return createUserResult; 
//     } catch(err) {
//         console.log(err);
//     }
// }

export const insertRefreshToken = async(refreshToken, email) => {
    try {
        console.log(email)
        const connection = await pool.getConnection(async conn => conn);
        const insertRefreshTokenResult = await insertToken(connection, refreshToken, email);
        connection.release();
        return insertRefreshTokenResult; 
    } catch(err) {
        console.log(err);
    }
}

/** 경기대 이메일인지 확인 */
export const isKyonggiEmail = (email) => {
    const pattern = /^[a-zA-Z0-9_.+-]+@kyonggi\.ac\.kr$/i;
    return pattern.test(email);
}

/** 랜덤 인증번호 생성 */
export const createAuthNum = () => {
    return Math.floor(Math.random() * 9000) + 1000;
}

/** 본인인증 후 유저 생성*/
export const createAuthUser = async(user) => {
    try {
        const connection = await pool.getConnection(async conn => conn);
        const authUserResult = await insertAuthUser(connection, user);
        connection.release();
        return authUserResult;
    } catch(err) {
        console.log(err);
    }
};

export const checkAlarms = async(alarm_id) =>{// 알림 확인 

    const connection = await pool.getConnection(async conn => conn);
    const checkAlarmsResult = await updateAlarms(connection,alarm_id);
    connection.release();
};