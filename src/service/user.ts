import { Inject, Service } from "typedi";
import { UserSearchReq } from "../api/request/userSearchReq";
import { PageResList } from "../api/response/pageResList";
import { PageResObj } from "../api/response/pageResObj";
import { UserDto } from "../dto";
import { User } from "../entity/user";
import { UserQueryRepo } from "../repository/user";

@Service()
export class UserService {
	constructor(readonly userQueryRepo: UserQueryRepo) {}

	async findAll(param: UserSearchReq): Promise<PageResList<User>> {
		const result = await this.userQueryRepo.search(param);
		return new PageResList<User>(
			result[1],
			param.limit,
			result[0].map((el: User) => {
				delete el.password_hash;
				delete el.nonce;
				return el;
			}),
			"Successfully found User list.",
		);
	}

	async create(paramObj: UserDto): Promise<PageResObj<User | {}>> {
		let user = await this.userQueryRepo.findOne("public_address", paramObj.public_address);
		// if (paramObj.store_name === "") delete paramObj.store_name; >> why use this code?
		if (user) {
			await this.userQueryRepo.update(paramObj, "public_address", paramObj.public_address);
			return new PageResObj(paramObj, "Seller registration was successful.");
		}
		paramObj.nonce = String(Math.floor(Math.random() * 1000000));
		user = await this.userQueryRepo.create(paramObj);
		const result = await this.userQueryRepo.findOne("public_address", user.identifiers[0].public_address);
		return new PageResObj(result, "Seller registration was successful.");
	}
}
