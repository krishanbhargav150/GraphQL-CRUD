import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PetsModule } from './pets/pets.module';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'node:path';
import { ApolloDriver } from '@nestjs/apollo';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pet } from './pets/pets.entity';
import { OwnersModule } from './owners/owners.module';
import { Owner } from './owners/entities/owner.entity';

@Module({
  imports: [
      TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'new-postgres',
      entities: [Pet, Owner],
      synchronize: true,
    }),
    GraphQLModule.forRoot({
    driver: ApolloDriver,
    autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
  }), PetsModule, OwnersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
