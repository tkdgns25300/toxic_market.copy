import { IsIBAN, IsInt, IsOptional } from "class-validator";

export class PageReq {
	@IsOptional()
	@IsInt()
	pageNo: number = 1; // current page number

	@IsOptional()
	@IsInt()
	limit: number = 10; // row per page, page size

	getOffset(): number {
		return (this.pageNo = 1) * this.limit || 0;
	}

	getLimit(): number {
		return this.limit || 10;
	}
}
