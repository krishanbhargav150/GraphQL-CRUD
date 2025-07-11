import { Field, InputType, Int } from "@nestjs/graphql";
import { IsAlpha, IsNumber, Min } from "class-validator";

@InputType()
export class CreatePetDto {
    @IsAlpha()
    @Field()
    name: string;

    @Field(() => Int)
    ownerId: number;

    @Min(0)
    @IsNumber()
    @Field({nullable: true})
    age?: number;

    @Field({nullable: true})
    type?: string;
}