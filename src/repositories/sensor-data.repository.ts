import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SensorData } from '../database/entities/sensor-data.entity';

@Injectable()
export class SensorDataRepository {
  constructor(
    @InjectRepository(SensorData)
    private readonly repository: Repository<SensorData>,
  ) {}

  async storeSensorData(sensorDataArray: SensorData[]): Promise<void> {
    const sensorDataEntities = sensorDataArray.map(
      ({ timestamp, temperature, humidity }) => {
        const sensorData = new SensorData();
        sensorData.timestamp = timestamp;
        sensorData.temperature = temperature;
        sensorData.humidity = humidity;
        return sensorData;
      },
    );

    await this.repository
      .createQueryBuilder()
      .insert()
      .values(sensorDataEntities)
      .execute();
  }
}
