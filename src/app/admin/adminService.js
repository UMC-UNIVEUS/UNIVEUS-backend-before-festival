import pool from "../../../config/database";
import {updateStatusByAdmin, updateHiddenByAdmin} from "./adminDao"


export const changeStatusByAdmin = async(post_status, post_id)=>{// 게시글 상태 변경

    const changeStatusByAdminParms = [post_status,post_id]
    const connection = await pool.getConnection(async conn => conn);
    const updateStatusByAdminResult = await updateStatusByAdmin(connection,changeStatusByAdminParms); 
    connection.release();
};

export const changeHiddenByAdmin = async(hidden, post_id)=>{// 게시글 상태 변경

    const changeHiddenByAdminParms = [hidden,post_id]
    const connection = await pool.getConnection(async conn => conn);
    const updateHiddenByAdminResult = await updateHiddenByAdmin(connection,changeHiddenByAdminParms); 
    connection.release();
};


