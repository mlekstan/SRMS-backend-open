import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule } from './clients/clients.module';
import { CardsModule } from './cards/cards.module';

@Module({
  imports: [ClientsModule, CardsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
