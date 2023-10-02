import { Entity, Column, PrimaryColumn, BaseEntity } from "typeorm";
import { UserSellerType } from "../enum";

@Entity("user")
export class User extends BaseEntity {
    @PrimaryColumn({
        type: "char",
        length: 42,
        comment: "사용자 지갑주소",
    })
    public_address: string;

    @Column({
        type: "char",
        length: 6,
        comment: "kaikas 로그인 시 필요한 논스 값",
    })
    nonce: string;

    @Column({
        type: "int",
        default: 0,
        comment: "보유 CF",
    })
    cf_balance: number;

    @Column({
        type: "char",
        length: 1,
        default: "X",
        comment: "상품 판매 가능 여부",
    })
    is_seller: string;

    @Column({
        type: "char",
        length: 1,
        default: "X",
        comment: "관리자 여부",
    })
    is_admin: string;

    @Column({
        type: "varchar",
        length: 100,
        default: null,
        nullable: true,
        comment: "판매자 이메일",
    })
    email: string;

    @Column({
        type: "varchar",
        length: 30,
        default: null,
        nullable: true,
        comment: "사업자 상호명",
    })
    store_name: string;

    @Column({
        type: "varchar",
        length: 20,
        default: null,
        nullable: true,
        comment: "판매자 사업자용 연락처",
    })
    phone: string;

    @Column({
        type: "varchar",
        length: 20,
        default: "",
        comment: "판매자 이름",
    })
    name: string;

    @Column({
        type: "varchar",
        length: 300,
        default: null,
        nullable: true,
        comment: "법인 등기부등본, 본인 신분증 사본",
    })
    verify_file_url: string;

    @Column({
        type: "varchar",
        length: 100,
        default: null,
        nullable: true,
        comment: "사업자 주소지",
    })
    address: string;

    @Column({
        type: "enum",
        enum: UserSellerType,
        default: null,
        nullable: true,
        comment: "판매자 종류",
    })
    seller_type: UserSellerType;

    @Column({
        type: "varchar",
        length: 20,
        default: null,
        nullable: true,
        unique: true,
        comment: "아이디",
    })
    id: string;

    @Column({
        type: "varchar",
        length: 100,
        default: null,
        nullable: true,
        comment: "비밀번호(해시 암호화)",
    })
    password_hash: string;

    @Column({
        type: "char",
        length: 1,
        default: "X",
        comment: "응모 시스템 이용약관 동의 여부",
    })
    agree_raffle_service: string;

    @Column({
        type: "varchar",
        length: 200,
        default: null,
        nullable: true,
        comment: "프로필 이미지",
    })
    profile_img: string;

    @Column({
        type: "varchar",
        length: 12,
        default: null,
        nullable: true,
        comment: "닉네임",
    })
    nickname: string;

    @Column({
        type: "text",
        default: null,
        nullable: true,
        comment: "소개글",
    })
    introduction: string;

    @Column({
        type: "varchar",
        length: 1,
        default: "X",
        comment: "Toxic Ape 프로젝트 여부",
    })
    toxic_project: string;

    @Column({
        type: "varchar",
        length: 1,
        default: "X",
        comment: "Catbotica 프로젝트 여부",
    })
    catbotica_project: string;
}
