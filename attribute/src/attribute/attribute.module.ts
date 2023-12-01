import { Module } from '@nestjs/common';
import { AttributeService } from './attribute.service';
import { AttributeController } from './attribute.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Attribute } from './entities/attribute.entity';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AttributeSet } from './entities/attribute_set.entity';
import { AssignedAttribute } from './entities/assigned-attribute.entity';
import { AttributeType } from './entities/attribute-type.entity';
import { AttributeOption } from './entities/attribute-option.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Attribute]),
  TypeOrmModule.forFeature([AttributeSet]),
  TypeOrmModule.forFeature([AssignedAttribute]),
  TypeOrmModule.forFeature([AttributeType]),
  TypeOrmModule.forFeature([AttributeOption]),
  ClientsModule.register([
    {
      name: 'CUSTOMER_SERVICE',
      transport: Transport.TCP,
      options: {
        host: 'localhost',
        port: 3001,
      },
    },
  ])],
  controllers: [AttributeController],
  providers: [AttributeService],
})
export class AttributeModule {}
