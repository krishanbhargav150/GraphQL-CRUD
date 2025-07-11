import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { PetsService } from './pets.service';
import { Pet } from './pets.entity';
import { CreatePetDto } from './dto/create-pet.dto';
import { Owner } from 'src/owners/entities/owner.entity';

@Resolver(() => Pet)
export class PetsResolver {
    constructor(private petsService: PetsService) {}

    @Mutation(() => Pet)
    createPet(@Args('CreatePetDto') body: CreatePetDto): Promise<Pet> {
        return this.petsService.createPet(body);
    }

    @Query(() => [Pet])
    getPets(): Promise<Pet[]> {
        return this.petsService.findAll();
    }

    @Query(() => Pet)
    getPetsById(@Args('id') id: number): Promise<Pet> {
        return this.petsService.findOneById(id);
    }

    @ResolveField(() => Owner, { name: 'owner' })
    getOwner(@Parent() pet: Pet): Promise<Owner> {
        return this.petsService.getOwner(pet.ownerId)
    }


}
