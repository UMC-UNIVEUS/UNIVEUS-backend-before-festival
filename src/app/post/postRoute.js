import express from "express"
import {getPost, postPost, patchPost, deletePost, postImg } from "./postController";

const postRouter = express.Router();

postRouter.get('/:post_id', getPost); // 게시글(+참여자 목록) 조회 API
postRouter.post('/', postPost); // 게시글 작성 API
postRouter.patch('/:post_id', patchPost); // 게시글 수정 API
postRouter.delete('/:post_id', deletePost); // 게시글 삭제 API
postRouter.post('/:post_id/img', postImg); // 이미지 업로드 API

export default postRouter;