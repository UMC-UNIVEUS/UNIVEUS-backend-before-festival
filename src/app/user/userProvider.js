import pool from '../../../config/database';
import {
    selectUserDefaultProfilebyId,
    selectUserIntroProfilebyId
} from './userDao';

export const showUserDefaultProfile= async (id) => {
    const connection = await pool.getConnection(async (conn) => conn);
    const showUserDefaultProfileResult = selectUserDefaultProfilebyId(connection, id);

    connection.release();
    return showUserDefaultProfileResult;

}

export const showUserIntroProfile = async (id) => {
    const connection = await pool.getConnection(async (conn) => conn);
    const showUserIntroProfileResult = selectUserIntroProfilebyId(connection, id);
}

