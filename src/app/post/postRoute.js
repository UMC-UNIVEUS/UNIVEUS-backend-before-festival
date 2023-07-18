import express from "express"
import {getPost,postPost, updatePost, deletePost } from "./postController";

const postRouter = express.Router();

postRouter.get('/:post_id', getPost); // 게시글 조회 API
postRouter.post('/', postPost); // 게시글 작성 API
postRouter.put('/:post_id', updatePost); // 게시글 수정 API
postRouter.delete('/:post_id', deletePost); // 게시글 삭제 API

export default postRouter;