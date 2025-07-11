import { Injectable } from '@nestjs/common';
import { CreateOwnerInput } from './dto/create-owner.input';
import { UpdateOwnerInput } from './dto/update-owner.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Owner } from './entities/owner.entity';
import { Repository } from 'typeorm';

@Injectable()
export class OwnersService {
  constructor(@InjectRepository(Owner) private ownerRepository: Repository<Owner>) {}
  create(createOwnerInput: CreateOwnerInput): Promise<Owner> {
    const owner = this.ownerRepository.create(createOwnerInput);
    return this.ownerRepository.save(owner);
  }

  findAll() {
    return this.ownerRepository.find();
  }

  findOne(id: number) {
    return this.ownerRepository.findOneOrFail({ where: { id }});
  }

  // update(id: number, updateOwnerInput: UpdateOwnerInput) {
  //   return `This action updates a #${id} owner`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} owner`;
  // }
}
