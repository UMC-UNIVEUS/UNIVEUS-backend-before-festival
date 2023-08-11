import express from "express"
import { getPostListPage } from "./mainController"

const mainRouter = express.Router();

mainRouter.get('/', getPostListPage);

export default mainRouter;