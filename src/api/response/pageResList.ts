import { IsArray, IsBoolean, IsInt, IsString } from "class-validator";

export class PageResList<T> {
	@IsInt()
	totalCount: number;

	@IsInt()
	totalPage: number;

	@IsString()
	msg: string;

	@IsArray()
	items: T[];

	@IsBoolean()
	error: boolean;

	constructor(
		totalCount: number,
		pageSize: number,
		items: T[],
		msg: string,
		error: boolean = false,
	) {
		this.error = error;
		this.totalCount = totalCount;
		this.totalPage = Math.ceil(totalCount / pageSize) | 0;
		this.msg = msg;
		this.items = items;
	}
}
