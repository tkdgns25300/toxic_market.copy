import { Service } from "typedi";
import { getDataSource } from "../../ormconfig";
import { UserSearchReq } from "../api/request/userSearchReq";
import { User } from "../entity/user";
import { BaseQueryRepo } from "./base";

const dataSource = getDataSource();

@Service()
export class UserQueryRepo extends BaseQueryRepo {
	constructor() {
		super("user", "User");
	}

	search(param: UserSearchReq): Promise<[Array<any>, number]> {
		const query = dataSource.manager
			.createQueryBuilder(User, "user")
			.where("public_address like :public_address", {
				public_address: `%${param.getAddress}%`,
			});

		if (param.getId) {
			query.andWhere("id like :id", {
				id: `%${param.getId}%`,
			});
		}

		if (param.getUserToxicProject) {
			query.andWhere(`toxic_project = :user_toxic_project`, {
				user_toxic_project: param.getUserToxicProject,
			});
		}

		if (param.getUserCatboticaProject) {
			query.andWhere(`catbotica_project = :user_catbotica_project`, {
				user_catbotica_project: param.getUserCatboticaProject,
			});
		}

		return query.skip(param.getOffset()).take(param.getLimit()).getManyAndCount();
	}
}
