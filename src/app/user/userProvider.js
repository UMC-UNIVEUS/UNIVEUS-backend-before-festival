import pool from '../../../config/database';
import { selectUserProfilebyId } from './userDao';

export const showUserProfile = async (id) => {
    const connection = await pool.getConnection(async (conn) => conn);
    const showUserProfileResult = selectUserProfilebyId(connection, id);

    connection.release();
    return showUserProfileResult;

}