import express from "express"
import {getPost, postPost, patchPost, deletePost,patchScrap, patchLike, postParticipant, getParticipant, patchParticipant, deleteParticipant, postOneDayAlarm, participateUniveus} from "./postController";
import { jwtMiddleware } from "../../../config/jwtMiddleWare";

const postRouter = express.Router();

postRouter.get('/:post_id', getPost); // 게시글(+참여자 목록) 조회 API
postRouter.post('/', jwtMiddleware,postPost); // 게시글 작성 API
postRouter.patch('/:post_id', jwtMiddleware,patchPost); // 게시글 수정 API
postRouter.delete('/:post_id', jwtMiddleware,deletePost); // 게시글 삭제 API
postRouter.patch('/:post_id/scrap', jwtMiddleware, patchScrap); // 게시글 스크랩 API
postRouter.patch('/:post_id/like', jwtMiddleware, patchLike); // 게시글 좋아요 API
postRouter.get('/:post_id/participant', jwtMiddleware, getParticipant); // 게시글 참여자 신청 내역 조회 API
postRouter.post('/:post_id/participant/apply', jwtMiddleware, postParticipant); // 게시글 참여 신청 API + 참여 신청 알람(to 작성자) API
postRouter.patch('/:post_id/participant/register', jwtMiddleware, patchParticipant); // 게시글 참여자 승인 API + 참여 승인 알람(to 참여자) API 
postRouter.delete('/:post_id/participant/refuse', jwtMiddleware, deleteParticipant); // 게시글 참여자 거절 API + 참여 거절 알람(to 참여자) API 
//postRouter.patch('/:post_id/status', jwtMiddleware, patchStatus); // 모집 상태 변경 API >> 일단 보류
postRouter.post('/:post_id/participant/onedayalarm', postOneDayAlarm); // 게시글 모임 1일 전 알림 API
postRouter.post('/:post_id/participant', jwtMiddleware, participateUniveus); // 유니버스 참여 API (축제용)





export default postRouter;