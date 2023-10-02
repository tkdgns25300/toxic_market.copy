import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Auction } from "./auction";

@Entity("bid_log")
export class BidLog extends BaseEntity {
    @PrimaryGeneratedColumn({
        comment: "로그 아이디",
    })
    id: number;

    @Column({
        type: "varchar",
        length: 42,
        comment: "입찰한 사용자 지갑 주소",
    })
    bidder: string;

    @Column({
        type: "int",
        comment: "입찰가격",
    })
    bid: number;

    @CreateDateColumn({
        comment: "입찰 일자",
    })
    created_at: Date;

    @ManyToOne(() => Auction, (auction) => auction.bid_logs)
    @JoinColumn({ name: "auction_id" })
    auction: Auction;

    // @Column({ type: "int", name: "auction_id", default: null, nullable: true })
    // @ManyToOne(() => Auction, (auction) => auction.id, {
    //     onDelete: "CASCADE",
    // })
    // @JoinColumn({ name: "auction_id" })
    // auction_id: number;
}
