import { Injectable } from '@nestjs/common';
import { SerialService } from '../serial/serial.service';

@Injectable()
export class ArduinoService {
  constructor(private readonly serialService: SerialService) {}

  getActualValues() {
    this.serialService.getActualValues();
    return true;
  }
}
