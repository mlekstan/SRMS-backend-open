import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule } from './clients/clients.module';
import { CardsModule } from './cards/cards.module';
import { ItemsModule } from './items/items.module';

@Module({
  imports: [ClientsModule, CardsModule, ItemsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
