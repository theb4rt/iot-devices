import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SerialModule } from './serial/serial.module';
import { WebsocketService } from './websocket/websocket.service';
import { WebsocketModule } from './websocket/websocket.module';
import { DatabaseService } from './database/database.service';
import { DatabaseModule } from './database/database.module';
import { DataController } from './data/data.controller';
import { ArduinoController } from './arduino/arduino.controller';

@Module({
  imports: [
    SerialModule,
    WebsocketModule,
    DatabaseModule,
    ConfigModule.forRoot(),
  ],
  controllers: [AppController, DataController, ArduinoController],
  providers: [AppService, WebsocketService, DatabaseService],
})
export class AppModule {}
