import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerModule } from './customer/customer.module';

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
  }),CustomerModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
