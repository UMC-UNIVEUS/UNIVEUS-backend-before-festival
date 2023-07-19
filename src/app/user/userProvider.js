import {selectUser} from "./userDao"
import pool from "../../../config/database"

export const isUser = async(email_id) => {

    const connection = await pool.getConnection(async (conn) => conn);
    const isUser = await selectUser(connection, email_id);
    return isUser.length;
}
