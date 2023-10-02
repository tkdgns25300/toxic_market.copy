import { BaseEntity, Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { BidLog } from "./bidLog";

@Entity("auction")
export class Auction extends BaseEntity {
    @PrimaryGeneratedColumn({
        comment: "경매 아이디",
    })
    id: number;

    @Column({
        type: "int",
        comment: "상품 가격",
    })
    price: number;

    @CreateDateColumn({
        comment: "경매 시작일",
    })
    start_at: Date;

    @CreateDateColumn({
        comment: "경매 종료일",
    })
    end_at: Date;

    @Column({
        type: "varchar",
        length: 50,
        comment: "상품명",
    })
    title: string;

    @Column({
        type: "text",
        comment: "상품 설명",
    })
    description: string;

    @Column({
        type: "varchar",
        length: 200,
        comment: "판매자 연락 링크",
    })
    contact: string;

    @CreateDateColumn({
        comment: "생성 시간",
    })
    created_at: Date;

    @Column({
        type: "varchar",
        length: 200,
        nullable: true,
        comment: "대표 이미지 주소",
    })
    main_img_url: string;

    @Column({
        type: "text",
        nullable: true,
        comment: "서브 이미지 주소",
    })
    sub_img_url: string;

    @Column({
        type: "char",
        length: 1,
        nullable: true,
        default: null,
        comment: "관리자 허락 여부",
    })
    is_approved: string;

    @Column({
        type: "char",
        length: 1,
        nullable: true,
        default: null,
        comment: "경매의 성공적인 마무리 여부",
    })
    is_succeed: string;

    @Column({
        type: "char",
        length: 42,
        comment: "제일 높은 금액을 입찰한 사용자 주소",
        nullable: true,
    })
    bidder: string;

    @Column({
        type: "int",
        comment: "제일 높은 입찰가격",
    })
    bid: number;

    @Column({
        type: "char",
        length: 42,
        comment: "생성한 사용자",
        nullable: true,
    })
    creator_address: string;

    @OneToMany(() => BidLog, (bid_log) => bid_log.auction)
    bid_logs: BidLog[];

    // @OneToMany(() => BidLog, (detail) => detail.auction_id)
    // bid_logs: BidLog[];

    // @ManyToOne(() => User, (user) => user.public_address, {
    //     createForeignKeyConstraints: false,
    // })
    // @JoinColumn({ name: "creator_address" })
    // creator: string;
}
