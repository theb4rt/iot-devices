import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SerialModule } from './serial/serial.module';
import { DatabaseService } from './database/database.service';
import { DatabaseModule } from './database/database.module';
import { DataController } from './data/data.controller';
import { ArduinoController } from './arduino/arduino.controller';
import { ArduinoService } from './arduino/arduino.service';

@Module({
  imports: [SerialModule, DatabaseModule, ConfigModule.forRoot()],
  controllers: [AppController, DataController, ArduinoController],
  providers: [AppService, DatabaseService, ArduinoService],
})
export class AppModule {}
