import { Module } from '@nestjs/common';
import { AttributeModule } from './attribute/attribute.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '',
    database: 'amala',
    autoLoadEntities:true,
    synchronize: true,
  }),AttributeModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
