import { Injectable } from '@nestjs/common';
import { Pet } from './pets.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePetDto } from './dto/create-pet.dto';
import { OwnersService } from 'src/owners/owners.service';
import { Owner } from 'src/owners/entities/owner.entity';

@Injectable()
export class PetsService {
    constructor(@InjectRepository(Pet) private petRepository: Repository<Pet>,
                                        private ownerService: OwnersService) {}

    async createPet(body: CreatePetDto): Promise<Pet>  {
        const pet = this.petRepository.create(body);
        return this.petRepository.save(pet);
    }

    async findAll(): Promise<Pet[]> {
        return this.petRepository.find();
    }

    findOneById(id: number): Promise<Pet> {
        return this.petRepository.findOneOrFail({ where: { id }});
    }

    getOwner(id: number): Promise<Owner> {
        return this.ownerService.findOne(id);
    }
}
