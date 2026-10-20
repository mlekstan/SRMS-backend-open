import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule } from './clients/clients.module';
import { CardsModule } from './cards/cards.module';
import { ItemsModule } from './items/items.module';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
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
import { Branch } from './branches/branch.entity';
import { Item } from './items/item.entity';
import { BranchesModule } from './branches/branches.module';
import { User } from './users/user.entity';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { RentalSale } from './rentalSale/entities/rentalSale.entity';
import { RentalSalePosition } from './rentalSale/entities/rentalSalePosition.entity';
import { RentedItem } from './rentalSale/entities/rentedItem.entity';
import { RentalSalesModule } from './rentalSale/rentalSales.module';
import { VehiclePrice } from './price-list/entities/vehicle-price.entity';
import { PriceListModule } from './price-list/price-list.module';
import { ConfigService } from '@nestjs/config';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService): TypeOrmModuleOptions => ({
        type: configService.get<string>("DB_TYPE", "postgres") as "postgres",
        host: configService.get<string>("DB_HOST_NAME", "localhost"),
        port: configService.get<number>("DB_PORT", 5432),
        username: configService.get<string>("DB_USERNAME", "admin"),
        password: configService.get<string>("DB_PASSWORD", "admin"),
        database: configService.get<string>("DB_NAME", "srms-db"),
        entities: [Client, Card, CardClient, Category, DriveType, Subcategory, Vehicle, ElectricVehicle, Branch, Item, User, RentalSale, RentalSalePosition, RentedItem, VehiclePrice],
        synchronize: true, 
      }),
      inject: [ConfigService]
    }),
    ClientsModule, 
    CardsModule,
    ItemsModule,
    CategoriesModule,
    DriveTypesModule,
    SubcategoriesModule,
    BranchesModule,
    UsersModule,
    AuthModule,
    RentalSalesModule,
    PriceListModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {
  constructor(private dataSource: DataSource) {}
}
