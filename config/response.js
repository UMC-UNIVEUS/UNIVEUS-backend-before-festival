//API 응답의 기본 형식들 정의

export const baseResponse = {
    SUCCESS : { "isSuccess": true, "code": 1000, "message":"성공" },

    //유저 관련 오류
    USER_USERID_NOT_EXIST : { "isSuccess": false, "code": 2002, "message": "해당 유저가 존재하지 않습니다." },


    POST_POSTID_NOT_EXIST : { "isSuccess": false, "code": 2003, "message": "해당 게시글이 존재하지 않습니다." },

    PROFILE_INFO_NOT_EXIST : { "isSuccess": false, "code": 2004, "message": "유저 프로필 정보가 존재하지 않습니다." },


    //Connection, Transaction 등의 서버 오류
    DB_ERROR : { "isSuccess": false, "code": 4000, "message": "데이터 베이스 에러"},
    SERVER_ERROR : { "isSuccess": false, "code": 4001, "message": "서버 에러"},
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
};