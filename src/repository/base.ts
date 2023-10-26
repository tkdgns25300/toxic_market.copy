import { getDataSource } from "../../ormconfig";
import { PageReq } from "../api/request/PageReq";

const dataSource = getDataSource();

export class BaseQueryRepo {
	schemaName: string;
	schemaClassName: string;
	constructor(schemaName, schemaClassName) {
		this.schemaName = schemaName;
		this.schemaClassName = schemaClassName;
	}

	findAll(param: PageReq) {
		return dataSource.manager
			.createQueryBuilder(
				this.schemaClassName,
				this.schemaName,
			)
			.skip(param.getOffset())
			.take(param.getLimit())
			.getManyAndCount();
	}

	findOne(whereKey: string, whereValue: string | number) {
		return dataSource.manager
			.createQueryBuilder(
				this.schemaClassName,
				this.schemaName,
			)
			.where(
				`${this.schemaClassName}.${whereKey} = :${whereKey}`,
				{
					[whereKey]: whereValue,
				},
			)
			.getOne();
	}

	create(paramObj: object) {
		return dataSource
			.createQueryBuilder()
			.insert()
			.into(this.schemaClassName)
			.values(paramObj)
			.execute();
	}

	update(
		paramObj: object,
		whereKey: string,
		whereValue: string | number,
	) {
		return dataSource
			.createQueryBuilder()
			.update(this.schemaClassName)
			.set(paramObj)
			.where(
				`${this.schemaName}.${whereKey} = :${whereKey}`,
				{
					[whereKey]: whereValue,
				},
			)
			.execute();
	}

	delete(whereKey: string, whereValue: string | number) {
		return dataSource
			.createQueryBuilder()
			.delete()
			.from(this.schemaClassName)
			.where(
				`${this.schemaName}.${whereKey} = :${whereKey}`,
				{
					[whereKey]: whereValue,
				},
			)
			.execute();
	}
}
