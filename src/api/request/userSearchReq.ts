import { IsOptional, IsString } from "class-validator";
import { PageReq } from "./PageReq";

export class UserSearchReq extends PageReq {
	@IsString()
	public_address: string;

	@IsOptional()
	@IsString()
	id: string;

	@IsOptional()
	@IsString()
	name: string;

	@IsOptional()
	@IsString()
	user_toxic_project: string;

	@IsOptional()
	@IsString()
	user_catbotica_project: string;

	get getId() {
		return this.id ? this.id : "";
	}

	get getName() {
		return this.name ? this.name : "";
	}

	get getAddress() {
		return this.public_address ? this.public_address : "";
	}

	get getUserToxicProject() {
		return this.user_toxic_project ? this.user_toxic_project : "";
	}

	get getUserCatboticaProject() {
		return this.user_catbotica_project ? this.user_catbotica_project : "";
	}
}
