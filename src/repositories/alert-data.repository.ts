import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AlertData } from '../database/entities/alert-data.entity';

@Injectable()
export class AlertDataRepository {
  constructor(
    @InjectRepository(AlertData)
    private readonly repository: Repository<AlertData>,
  ) {}

  async storeAlertData(alertData: AlertData): Promise<void> {
    await this.repository.save(alertData);
  }
}
