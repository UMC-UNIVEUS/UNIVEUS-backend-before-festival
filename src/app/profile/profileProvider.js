import pool from '../../../config/database';
import {
    selectUserbyId,
    selectUserDefaultProfilebyId,
    selectUserIntroProfilebyId,
    selectUserMyUnivebyId,
    selectUserParticipatebyId
} from './profileDao';
import {baseResponse, response, errResponse} from "../../../config/response";
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration'

const utc = require('dayjs/plugin/utc');
const timezone = require('dayjs/plugin/timezone');

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(duration);

export const userIdCheck = async (user_id) => {
    const connection = await pool.getConnection(async (conn) => conn);
    const userIdCheckResult = selectUserbyId(connection, user_id);
    connection.release();
    return userIdCheckResult;
};


// 프로필 화면에서 상단에 위치하는 유저 기본 정보 프로필 내용을 불러오는 API
/* export const showUserDefaultProfile= async (user_id) => {
    const connection = await pool.getConnection(async (conn) => conn);
    const showUserDefaultProfileResult = await selectUserDefaultProfilebyId(connection, user_id);
    connection.release();
    if(showUserDefaultProfileResult[0]) {
        return showUserDefaultProfileResult[0];
    } else {
        return errResponse(baseResponse.PROFILE_INFO_NOT_EXIST);
    }
}; */


// 프로필 화면에서 하단에 위치하는 유저 소개 정보 프로필 내용을 불러오는 API
/* export const showUserIntroProfile = async (user_id) => {
    const connection = await pool.getConnection(async (conn) => conn);
    const showUserIntroProfileResult = await selectUserIntroProfilebyId(connection, user_id);
    connection.release();
    if(showUserIntroProfileResult[0]) {
        return showUserIntroProfileResult[0];
    } else {
        return errResponse(baseResponse.PROFILE_INFO_NOT_EXIST);
    }
};*/

export const showUserMyUnive = async (user_id) => {
    const connection = await pool.getConnection(async (conn) => conn);
    const showUserMyUniveResult = await selectUserMyUnivebyId(connection, user_id);
    connection.release();
    if(showUserMyUniveResult[0][0]) {
        for (let i = 0; i < showUserMyUniveResult[0].length; i++) {
            //학번 변경
            if(showUserMyUniveResult[0][i].class_of) {
                const changeClassof = Math.floor(showUserMyUniveResult[0][i].class_of / 100000 % 100);
                showUserMyUniveResult[0][i].class_of = changeClassof + "학번"
            }

            //모임 시간 변경
            if(showUserMyUniveResult[0][i].meeting_date) {
                const datevalue = dayjs(showUserMyUniveResult[0][i].meeting_date);
                showUserMyUniveResult[0][i].meeting_date = datevalue.month()+ 1 + "월" + datevalue.date() + "일";
                showUserMyUniveResult[0][i].meeting_time = datevalue.hour() + ":" + datevalue.minute();

                //D-day 추가
                const nowDate = dayjs();
                const diffDate = datevalue.diff(nowDate);
                const d = dayjs.duration(diffDate);
                const checkminus = d.milliseconds();
                if (checkminus <= 0)
                    showUserMyUniveResult[0][i].d_day = "종료";
                else {
                    if (d.days() > 0)
                        showUserMyUniveResult[0][i].d_day = "D-" + d.days();
                    else
                        showUserMyUniveResult[0][i].d_day = "D-" + "DAY"
                }
            }
        }
        return showUserMyUniveResult[0];
    } else {
        return errResponse(baseResponse.PROFILE_INFO_NOT_EXIST);
    }
};

export const showUserParticipate = async (user_id) => {
    const connection = await pool.getConnection(async (conn) => conn);
    const showUserParticipateResult = await selectUserParticipatebyId(connection, user_id);
    connection.release();

    if(showUserParticipateResult[0][0]) {
        for (let i = 0; i < showUserParticipateResult[0].length; i++) {
            //학번 변경
            if(showUserParticipateResult[0][i].class_of) {
                const changeClassof = Math.floor(showUserParticipateResult[0][i].class_of / 100000 % 100);
                showUserParticipateResult[0][i].class_of = changeClassof + "학번"
            }

            //모임 시간 변경
            if(showUserParticipateResult[0][i].meeting_date) {
                const datevalue = dayjs(showUserParticipateResult[0][i].meeting_date);
                showUserParticipateResult[0][i].meeting_date = datevalue.month()+ 1 + "월" + datevalue.date() + "일";
                showUserParticipateResult[0][i].meeting_time = datevalue.hour() + ":" + datevalue.minute();

                //D-day 추가
                const nowDate = dayjs();
                const diffDate = datevalue.diff(nowDate);
                const d = dayjs.duration(diffDate);
                const checkminus = d.milliseconds();
                if (checkminus <= 0)
                    showUserParticipateResult[0][i].d_day = "종료";
                else {
                    if (d.days() > 0)
                        showUserParticipateResult[0][i].d_day = "D-" + d.days();
                    else
                        showUserParticipateResult[0][i].d_day = "D-" + "DAY"
                }
            }
        }
        return showUserParticipateResult[0];
    } else {
        return errResponse(baseResponse.PROFILE_INFO_NOT_EXIST);
    }
};


