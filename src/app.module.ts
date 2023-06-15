import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SerialService } from './serial/serial.service';
import { SerialModule } from './serial/serial.module';
import { WebsocketService } from './websocket/websocket.service';
import { WebsocketModule } from './websocket/websocket.module';
import { DatabaseService } from './database/database.service';
import { DatabaseModule } from './database/database.module';
import { DataController } from './data/data.controller';

@Module({
  imports: [SerialModule, WebsocketModule, DatabaseModule],
  controllers: [AppController, DataController],
  providers: [AppService, SerialService, WebsocketService, DatabaseService],
})
export class AppModule {}
