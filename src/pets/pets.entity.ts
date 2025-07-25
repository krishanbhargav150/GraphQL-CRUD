import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Owner } from "src/owners/entities/owner.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
@ObjectType()
export class Pet {
    @PrimaryGeneratedColumn()
    @Field(() => Int)
    id: number;

    @Column()
    @Field()
    name: string;

    @Column({nullable: true})
    @Field({nullable: true})
    ownerId: number;

    @Column({nullable: true})
    @Field({nullable: true})
    age?: number;

    @Column({nullable: true})
    @Field({nullable: true})
    type?: string;

    @ManyToOne(() => Owner, owner => owner.pets)
    @Field(type => Owner, { nullable: true})
    owner?: Owner
}