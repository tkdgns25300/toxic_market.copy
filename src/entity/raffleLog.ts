import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Raffle } from "./raffle";

@Entity("raffle_log")
export class RaffleLog extends BaseEntity {
    @PrimaryGeneratedColumn({
        comment: "로그 아이디",
    })
    id: number;

    @Column({
        type: "varchar",
        length: 42,
        comment: "응모자 지갑 주소",
    })
    applicant: string;

    @Column({
        type: "int",
        comment: "응모 수량",
    })
    amount: number;

    @Column({
        type: "char",
        length: 1,
        nullable: true,
        default: null,
        comment: "당첨 여부",
    })
    is_winner: string;

    @CreateDateColumn({
        comment: "입찰 일자",
    })
    created_at: Date;

    @ManyToOne(() => Raffle, (raffle) => raffle.raffle_logs)
    @JoinColumn({ name: "raffle_id" })
    raffle: Raffle;

    // @ManyToOne(() => Raffle, (raffle) => raffle.id, {
    //     onDelete: "CASCADE",
    // })
    // @JoinColumn({ name: "raffle_id" })
    // raffle_id: number;
}
