//API 응답의 기본 형식들 정의

export const baseResponse = {
    SUCCESS : { "isSuccess": true, "code": 1000, "message":"성공" },

    //유저 관련 response msg
    USER_FIRST_NOT_EXIST : { "isSuccess": false, "code": 2000, "message": "첫 번째 유저가 존재하지 않습니다." },
    USER_SECOND_NOT_EXIST : { "isSuccess": false, "code": 2001, "message": "두 번째 유저가 존재하지 않습니다." },
    USER_USERID_NOT_EXIST : { "isSuccess": false, "code": 2002, "message": "해당 유저가 존재하지 않습니다." },
    SIGNUP_EMAIL_DUPLICATE : {"isSuccess" : false, "code" : 2003, "message" : "이미 존재하는 이메일입니다."},
    SIGNUP_EMAIL_KYONGGI : {"isSuccess" : false, "code" : 2004, "message" : "경기대학교 이메일만 사용 가능합니다."},
    SIGNUP_NICKNAME_EMPTY : {"isSuccess" : false, "code" : 2005, "message" : "닉네임을 입력해주세요."},
    SIGNUP_GENDER_EMPTY : {"isSuccess" : false, "code" : 2006, "message" : "성별을 입력해주세요."},
    SIGNUP_MAJOR_EMPTY : {"isSuccess" : false, "code" : 2007, "message" : "학과를 입력해주세요."},
    SIGNUP_STUDENTID_EMPTY : {"isSuccess" : false, "code" : 2008, "message" : "학번을 입력해주세요."},
    LOGIN_NOT_USER : {"isSuccess" : false, "code" : 2009, "message" : "회원이 아닙니다. 본인인증 페이지로 리다이렉트 됩니다." },
    SEND_AUTH_NUMBER_MSG : {"isSuccess" : true, "code" : 2010, "message" : "인증번호 문자 전송이 완료되었습니다."},
    SEND_AUTH_NUMBER_MSG_FAIL : {"isSuccess" : false, "code" : 2011, "message" : "인증번호 문자 전송을 실패했습니다."},
    VERIFY_NUMBER_SUCCESS : {"isSuccess" : true, "code" : 2012, "message" : "휴대폰 본인인증을 성공하였습니다." },
    VERIFY_NUMBER_FAIL : {"isSuccess" : false, "code" : 2013, "message" : "인증번호가 올바르지 않습니다." },
    NICK_NAME_DUPLICATE : {"isSuccess" : false, "code" : 2014, "message" : "닉네임이 중복됩니다." },
    SIGNUP_PHONE_NUMBER_EMPTY : {"isSuccess" : false, "code" : 2015, "message" : "전화번호를 입력해주세요."},
    USER_USERID_USERIDFROMJWT_NOT_MATCH : {"isSuccess":false, "code":2016, "message":"user_id와 userIdFromJWT가 일치하지 않습니다."},
    USER_USERID_EMPTY : { "isSuccess": false, "code": 2017, "message": "user_Id를 입력해주세요." },
    USER_USER_NICKNAME_LENGTH : { "isSuccess": false, "code": 2018, "message": "닉네임 길이 제한을 초과하였습니다." },
    
    //게시글 관련
    POST_POSTID_NOT_EXIST : { "isSuccess": false, "code": 3000, "message": "해당 게시글이 존재하지 않습니다." },
    POST_TITLE_LENGTH : { "isSuccess": false, "code": 3001, "message": "제목은 최대 48자리를 입력해주세요." },
    POST_LOCATION_LENGTH : { "isSuccess": false, "code": 3002, "message": "모임장소는 최대 24자리를 입력해주세요." },
    POST_PEOPLE_LIMIT : { "isSuccess": false, "code": 3003, "message": "제한 인원은 4명 OR 6명만 가능합니다." },
    POST_CATEGORY_LIMIT : { "isSuccess": false, "code": 3004, "message": "축제 기간에는 '축제' 카테고리만 가능합니다." },
    POST_INFORMATION_EMPTY : { "isSuccess": false, "code": 3005, "message": "미입력된 항목이 있습니다." },
    POST_CONTENT_LENGTH : { "isSuccess": false, "code": 3006, "message": "소개글은 최대 500자리를 입력해주세요." },
    POST_INVITE_EMPTY : { "isSuccess": false, "code": 3007, "message": "아무도 초대하지 않았습니다." },
    POST_PARTICIPATION_CLOSE : { "isSuccess": false, "code": 3008, "message": "모집이 마감되었습니다." },
    POST_PARTICIPATION_OVERLAP : { "isSuccess": false, "code": 3009, "message": "이미 참여한 유저입니다." },
    POST_PARTICIPATION_NOT_MATCH : { "isSuccess": false, "code": 3011, "message": "참여를 하지 않았으므로 참여 취소를 할 수 없습니다." },
    POST_PARTICIPATION_CLOSE_NOW : { "isSuccess": true, "code": 3012, "message": "현재 참여한 인원 덕분에 모집 마감되었습니다!" },
    POST_PARTICIPATE_ONLY_ONE : { "isSuccess": false, "code": 3015, "message": "제한 인원이 4명일 때는 1명만 초대할 수 있습니다." },
    POST_PARTICIPATE_ONLY_TWO : { "isSuccess": false, "code": 3016, "message": "제한 인원이 6명일 때는 2명만 초대할 수 있습니다." },
    POST_PARTICIPATE_ALREADY_CLOSE : { "isSuccess": false, "code": 3017, "message": "이미 모집 마감됐습니다." },




    //댓글 관련
    COMMENT_COMMENTID_NOT_EXIST : { "isSuccess": false, "code": 3100, "message": "댓글이 존재하지 않습니다." },
    COMMENT_COMMENT_LENGTH : { "isSuccess": false, "code": 3101, "message": "댓글은 최대 50자리를 입력해주세요." },
    COMMENT_COMMENT_EMPTY : { "isSuccess": false, "code": 3102, "message": "댓글을 입력해주세요." },


    // 토큰 오류
    TOKEN_EMPTY : { "isSuccess": false, "code": 5000, "message":"JWT 토큰을 입력해주세요." },
    TOKEN_VERIFICATION_FAILURE : { "isSuccess": false, "code": 5001, "message":"JWT 토큰 검증 실패" },


    // 프로필 관련 오류 
    PROFILE_INFO_NOT_EXIST : { "isSuccess": false, "code": 2201, "message": "유저 프로필 정보가 존재하지 않습니다." },
    PROFILE_DEFAULT_INFO_NOT_EXIST : { "isSuccess": false, "code": 2202, "message": "유저 기본 프로필 정보가 존재하지 않습니다." },
    PROFILE_INTRO_INFO_NOT_EXIST : { "isSuccess": false, "code": 2203, "message": "유저 자기소개 프로필 정보가 존재하지 않습니다." },

    /** 신고 관련 MSG */
    REPORT_SUCCESS : {"isSuccess" : true, "code" : 6000, "message" : "신고가 접수되었습니다."},
    REPORT_FAIL : {"isSuccess" : false, "code" : 6001, "message" : "신고접수를 실패하였습니다."},


    //Connection, Transaction 등의 서버 오류
    DB_ERROR : { "isSuccess": false, "code": 4000, "message": "데이터 베이스 에러"},
    SERVER_ERROR : { "isSuccess": false, "code": 4001, "message": "서버 에러"},
    INVALID_FILE_PATH : { "isSuccess": false, "code": 4002, "message": "잘못된 파일 경로입니다."},

};


/*API의 응답을 해준다*/ 
export const response = ({isSuccess, code, message}, result) => {
    return {
        isSuccess: isSuccess,
        code: code,
        message: message,
        result: result
    }
};

export const errResponse = ({isSuccess, code, message}) => {
     return {
         isSuccess: isSuccess,
         code: code,
         message: message

       }
     }
