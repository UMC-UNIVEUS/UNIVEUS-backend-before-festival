import express from "express"
import { getPostListPage, searchTitle } from "./mainController";
import { jwtMiddleware } from "../../../config/jwtMiddleWare";
import { accountStatusMiddleware } from "../../../config/accountStatusMiddleware";

const mainRouter = express.Router();

mainRouter.use(jwtMiddleware);
mainRouter.use(accountStatusMiddleware);

mainRouter.get('/', getPostListPage);
mainRouter.get('/search', searchTitle);

export default mainRouter;