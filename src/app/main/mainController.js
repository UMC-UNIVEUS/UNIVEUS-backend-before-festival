import {baseResponse, response, errResponse} from "../../../config/response";
import { getPostList, countPosts } from "./mainProvider";

/**메인페이지 인기순 */
export const getPostListPage = async (req, res) => {
    const categoryType = parseInt(req.query.category); // 0: 친구만들기, 1: 스터디, 2: 취미모임, 3: 밥 같이먹기
    const sortedType = parseInt(req.query.sorted); // 0: 인기순 1: 최신순
    const page = parseInt(req.query.page);

    const postPageResult = await getPostList(categoryType, sortedType, page, 9);
    const postsNum = await countPosts(categoryType);

    return res.status(200).json(response(baseResponse.SUCCESS, { postPageResult, postsNum }));
}