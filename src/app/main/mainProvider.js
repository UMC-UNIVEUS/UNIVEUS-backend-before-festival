import { selectPopularPostList,  selectRecentlyPostList, countPostsByCategory } from "./mainDao"
import pool from "../../../config/database";

/** postListPage 계산 */
export const getPostList = async (categoryType, sortedType, page, size) => {
    let start = 0;

    if (page <=0) {
        page = 1;
    } 
    else {
        start = (page - 1) * size;
    }

    const getPostParams = [categoryType, start, size];
    const postPage =  await getPostPage( getPostParams, sortedType);

    return postPage;
}

/** postListPage 가져오기 */
export const getPostPage = async (getPostParams, sortedType) => {
    const connection = await pool.getConnection(async conn => conn);
    if (sortedType === 0) {
        const getPostResult = await selectPopularPostList(connection, getPostParams);
        connection.release();
        return getPostResult;
    }
    else {
        const getPostResult = await selectRecentlyPostList(connection, getPostParams);
        connection.release();
        return getPostResult;
    }
}

/** postListPage 게시글 수 세기 */
export const countPosts = async (getPostParams) => {
    const connection = await pool.getConnection(async conn => conn);
    const getPostResult = await countPostsByCategory(connection, getPostParams);
    return getPostResult;
}