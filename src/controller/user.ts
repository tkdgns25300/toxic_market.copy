import { Body, Controller, Get, Post, QueryParams, Res, UseBefore } from "routing-controllers";
import { checkAccessToken, checkAdminAccessToken } from "../middlewares/auth";
import { UserSearchReq } from "../api/request/userSearchReq";
import { Response } from "express";
import { QueryFailedError } from "typeorm";
import { PageResObj } from "../api/response/pageResObj";
import { UserService } from "../service/user";
import { UserDto } from "../dto";
import Container, { Inject, Service } from "typedi";

@Service()
@Controller("/user")
export class UserController {
	userService: UserService;

	constructor() {
		this.userService = Container.get("UserService");
	}

	@Get("/find")
	// @UseBefore(checkAdminAccessToken)
	async getAll(@QueryParams() param: UserSearchReq, @Res() res: Response) {
		try {
			return await this.userService.findAll(param);
		} catch (error) {
			if (error instanceof QueryFailedError) {
				return new PageResObj({}, error.message, true);
			}
			return new PageResObj({}, error.message, true);
		}
	}

	@Post("/create")
	// @UseBefore(checkAdminAccessToken)
	async create(@Body() params: UserDto, @Res() res: Response) {
		try {
			return await this.userService.create(params);
		} catch (error) {
			if (error instanceof QueryFailedError) {
				return new PageResObj({}, error.message, true);
			}
			return new PageResObj({}, error.message, true);
		}
	}
}

// userService가 안읽혀오는 듯

/**
 * {
    "error": true,
    "msg": "Cannot read properties of undefined (reading 'findAll')",
    "item": {}
	}
	{
    "error": true,
    "msg": "Cannot read properties of undefined (reading 'create')",
    "item": {}
	}
 */
