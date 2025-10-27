import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule } from './clients/clients.module';
import { CardsModule } from './cards/cards.module';
import { ItemsModule } from './items/items.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { Client } from './clients/client.entity';
import { Card } from './cards/card.entity';
import { CardClient } from './clients/cardClient.entity';
import { CategoriesModule } from './categories/categories.module';
import { Category } from './categories/category.entity';
import { DriveType } from './driveTypes/driveType.entity';
import { DriveTypesModule } from './driveTypes/driveTypes.module';
import { Subcategory } from './subcategories/subcategory.entity';
import { Vehicle } from './subcategories/vehicle.entity';
import { ElectricVehicle } from './subcategories/electricVehicle.entity';
import { SubcategoriesModule } from './subcategories/subcategories.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "postgres",
      host: "localhost",
      port: 5432,
      username: "admin",
      password: "admin",
      database: "srms-db",
      entities: [Client, Card, CardClient, Category, DriveType, Subcategory, Vehicle, DriveType, ElectricVehicle],
      synchronize: false
    }),
    ClientsModule, 
    CardsModule,
    ItemsModule,
    CategoriesModule,
    DriveTypesModule,
    SubcategoriesModule
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {
  constructor(private dataSource: DataSource) {}
}
