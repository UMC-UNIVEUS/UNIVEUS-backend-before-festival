import { isAdmin } from "./adminProvider";
import { baseResponse, response, errResponse } from "../../../config/response";
import { getAllUsersInfo } from "./adminProvider"

export const getUsersInfo = async(req, res) => {
    const userEmail = req.verifiedToken.userEmail;

    if (!isAdmin(userEmail)) return res.send(errResponse(baseResponse.NOT_ADMIN));

    const getAllUsersInfoResult = await getAllUsersInfo();

    return res.send(response(baseResponse.SUCCESS, getAllUsersInfoResult));
}