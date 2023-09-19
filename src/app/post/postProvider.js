import pool from "../../../config/database"
import { selectPost, selectParticipant, selectPostImages, selectParticipantList } from "./postDao";
import dayjs from 'dayjs';

export const retrievePost = async(post_id) =>{
    
    const connection = await pool.getConnection(async conn => conn);
    const postResult = await selectPost(connection,post_id);
    connection.release();

    return postResult[0];

};

export const retrievePostImages = async(post_id) =>{
    
    const connection = await pool.getConnection(async conn => conn);
    const selectPostImagesResult = await selectPostImages(connection,post_id);
    connection.release();

    return selectPostImagesResult;
};

export const retrieveParticipant = async(post_id)=>{
  
    const connection = await pool.getConnection(async conn => conn);
    const participantResult = await selectParticipant(connection,post_id);
    connection.release();

    return participantResult;
};

export const retrieveParticipantList = async(post_id)=>{ //게시글 참여자 신청 내역 조회 
  
    const connection = await pool.getConnection(async conn => conn);
    const participantResult = await selectParticipantList(connection,post_id);
    connection.release();

    return participantResult;
};

/** meeting_date 포맷팅 */
export const formatingMeetingDate = (post) => {

    const date = dayjs(post.meeting_date);
    const meeting_year = date.year();
    const meeting_month = date.month() < 9 ?  "0" + (date.month() + 1) : ""+(date.month() + 1);
    const meeting_date = date.date() < 10 ?  "0" + date.date() : ""+date.date();
    const meeting_time = (date.hour() < 10 ?  "0" + date.hour() : ""+date.hour()) + ":" + (date.minute() < 10 ? "0" + date.minute() : ""+date.minute());
    delete post.meeting_date;

    const datetime = {
        "meeting_year": meeting_year,
        "meeting_month":meeting_month,
        "meeting_date":meeting_date,
        "meeting_time":meeting_time,
    }
   
    Object.assign(post, datetime);
}

/** end_date 포맷팅 */
export const formatingEndDate = (post) => {
    const date = dayjs(post.end_date);
    const end_year = date.year();
    const end_month = date.month() < 10 ? "0" + (date.month() + 1)  : ""+(date.month() + 1);
    const end_date = date.date() < 10 ? "0" + date.date() : ""+date.date();
    const end_time = (date.hour() < 10 ? "0" + date.hour() : ""+date.hour()) + ":" + (date.minute() < 10 ? "0" + date.minute() : ""+date.minute());
    delete post.end_date;

    const datetime = {
        "end_year":end_year,
        "end_month":end_month,
        "end_date":end_date,
        "end_time":end_time,
    }
   
    Object.assign(post, datetime);
}

/** created_date 포맷팅 */
export const formatingCreatedAt = (post) => {
    const date = dayjs(post.created_at);
    const created_month = date.month() < 10 ? "0" + (date.month() + 1)  : ""+(date.month() + 1);
    const created_date = date.date() < 10 ? "0" + date.date() : ""+date.date();
    const created_time = (date.hour() < 10 ? "0" + date.hour() : ""+date.hour()) + ":" + (date.minute() < 10 ? "0" + date.minute() : ""+date.minute());
    delete post.created_at;

    const datetime = {
        "created_month":created_month,
        "created_date":created_date,
        "created_time":created_time,
    }
   
    Object.assign(post, datetime);
}

/** kakao 유효성 검사 */
export const isValidOpenChat = (openChaturi) => {
    
    if (openChaturi.startsWith("https://open.kakao.com/")) return true;

    return false;
}

/** 제목 이모지 제거 */
export const removeEmogi = async(title) => {
    const regex = /[^\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F700}-\u{1F77F}\u{1F780}-\u{1F7FF}\u{1F800}-\u{1F8FF}\u{1F900}-\u{1F9FF}\u{1FA00}-\u{1FA6F}\u{1FA70}-\u{1FAFF}\u{1FAB0}-\u{1FABF}\u{1FAC0}-\u{1FAFF}\u{1FAD0}-\u{1FAFF}\u{2000}-\u{3300}\u{2300}-\u{23FF}\u{2B\u{0020}-\u{0020}]/gu;
    const remove = title.replace(regex, "");
    console.log(remove)
    return remove;
    
}