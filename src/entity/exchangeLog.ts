import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserType } from "../enum";
import { User } from "./user";

@Entity("exchange_log")
export class ExchangeLog extends BaseEntity {
    @PrimaryGeneratedColumn({
        comment: "환전기록 아이디",
    })
    id: number;

    @Column({
        type: "enum",
        enum: UserType,
        comment: "사용자 타입",
    })
    user_type: UserType;

    @Column({
        type: "varchar",
        length: 1,
        default: "X",
        comment: "Toxic 프로젝트 여부",
    })
    user_toxic_project: string;

    @Column({
        type: "varchar",
        length: 1,
        default: "X",
        comment: "Catbotica 프로젝트 여부",
    })
    user_catbotica_project: string;

    @Column({
        type: "varchar",
        length: 20,
        default: null,
        nullable: true,
        comment: "아이디",
    })
    user_id: string;

    @Column({
        type: "int",
        default: null,
        nullable: true,
        comment: "환전 포인트",
    })
    exchange_point: number;

    @Column({
        type: "int",
        default: null,
        nullable: true,
        comment: "환전 코인",
    })
    exchange_coin: number;

    @Column({
        type: "int",
        comment: "수수료",
    })
    commission: number;

    @Column({
        type: "int",
        default: 0,
        comment: "수수료",
    })
    return_commission: number;

    @Column({
        type: "char",
        length: 42,
        comment: "생성한 사용자",
        nullable: true,
    })
    creator_address: string;

    // @ManyToOne(() => User, (user) => user.public_address, {
    //     createForeignKeyConstraints: false,
    // })
    // @JoinColumn({ name: "creator_address" })
    // creator: string;
}
