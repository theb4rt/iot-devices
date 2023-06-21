import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SensorData } from '../database/entities/sensor-data.entity';
import { SensorDataRepository } from '../repositories/sensor-data.repository';
import { SerialService } from './serial.service';
import { AlertData } from '../database/entities/alert-data.entity';
import { AlertDataRepository } from '../repositories/alert-data.repository';
import { WebsocketService } from '../websocket/websocket.service';

@Module({
  imports: [TypeOrmModule.forFeature([SensorData, AlertData])],
  providers: [
    SerialService,
    SensorDataRepository,
    AlertDataRepository,
    WebsocketService,
  ],
  exports: [SerialService],
})
export class SerialModule {}
