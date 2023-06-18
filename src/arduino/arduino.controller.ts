import { Body, Controller, Post } from '@nestjs/common';
import { SerialService } from '../serial/serial.service';
import { IChangeValueDto } from '../interfaces/arduino.interface';

@Controller('arduino')
export class ArduinoController {
  constructor(private readonly serialService: SerialService) {}

  @Post('change-value')
  changeValue(@Body() changeValueDto: IChangeValueDto): string {
    console.log('Change value command received');
    console.log(changeValueDto);
    this.serialService.sendChangeValue(changeValueDto);
    return 'Change value command sent';
  }
}
