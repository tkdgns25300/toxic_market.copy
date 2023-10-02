import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Bank } from "./bank";

@Entity("bank_log")
export class BankLog extends BaseEntity {
    @PrimaryGeneratedColumn({
        comment: "뱅크로그 아이디",
    })
    id: number;

    @Column({
        type: "varchar",
        length: 42,
        comment: "예금자 지갑 주소",
    })
    depositor: string;

    @Column({
        type: "int",
        comment: "예치액",
    })
    deposit_amount: number;

    @Column({
        type: "int",
        comment: "누적 보상액",
        default: 0,
    })
    accumulate_interest: number;

    @CreateDateColumn({
        type: "datetime",
        comment: "예치날",
    })
    entry_at: Date;

    @Column({
        type: "int",
        comment: "예치 당시의 예상 수익률",
    })
    expected_earingRate: number;

    @Column({
        type: "int",
        comment: "일일 예상 보상",
    })
    expected_daily_interest: number;

    @Column({
        type: "int",
        comment: "예치 당시의 만기까지 남은 날",
    })
    remaing_day: number;

    @ManyToOne(() => Bank, (bank) => bank.bank_logs)
    bank: Bank;
}
