import pool from "../../../config/database";
import { insertUser } from "../user/userDao" 

export const signUpByAdmin = async(userInfo) => {
    const connection = await pool.getConnection(async (conn) => conn);

    const userInfoParams = [ 
        userInfo.nickname,  
        userInfo.userEmail, 
        userInfo.gender,      
        userInfo.major,       
        userInfo.studentId,    
        userInfo.phoneNumber
      ];

    const insertUserResult = await insertUser(connection, userInfoParams)
    connection.release();
};
