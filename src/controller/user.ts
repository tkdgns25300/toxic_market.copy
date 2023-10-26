import { Get, JsonController, QueryParams, Res, UseBefore } from "routing-controllers";
import { checkAccessToken, checkAdminAccessToken } from "../middlewares/auth";
import { UserSearchReq } from "../api/request/userSearchReq";
import { Response } from "express";
import { QueryFailedError } from "typeorm";
import { PageResObj } from "../api/response/PageResObj";

@JsonController("/user")
export class UserController {
	@Get("/find")
	@UseBefore(checkAdminAccessToken)
	async getAll(@QueryParams() param: UserSearchReq, @Res() res: Response) {
		try {
		} catch (error) {
			if (error instanceof QueryFailedError) {
				return new PageResObj({}, error.message, true);
			}
			return new PageResObj({}, error.message, true);
		}
	}
}
