import express from "express"
import {getComment,getOneComment,postComment, deleteComment} from "./commController";

const commentRouter = express.Router();

commentRouter.get('/:post_id', getComment); // 댓글 조회 API
commentRouter.get('/one_comment/:comments_id', getOneComment); // 댓글 개별 조회 API
commentRouter.post('/:post_id', postComment); // 댓글 작성 API
commentRouter.delete('/:comments_id', deleteComment); // 댓글 삭제 API

export default commentRouter;