import express from "express"
import {getPost, postPost, patchPost, deletePost,patchScrap, patchLike, postParticipant } from "./postController";
import { jwtMiddleware } from "../../../config/jwtMiddleWare";

const postRouter = express.Router();

postRouter.get('/:post_id', getPost); // 게시글(+참여자 목록) 조회 API
postRouter.post('/', postPost); // 게시글 작성 API
postRouter.patch('/:post_id', patchPost); // 게시글 수정 API
postRouter.delete('/:post_id', deletePost); // 게시글 삭제 API
postRouter.patch('/:post_id/scrap', jwtMiddleware, patchScrap); // 게시글 스크랩 API
postRouter.patch('/:post_id/like', patchLike); // 게시글 좋아요 API
postRouter.post('/:post_id/participant', jwtMiddleware, postParticipant); // 게시글 참여자 등록 API + 참여자 승인 알람 API


export default postRouter;