import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { SerialService } from '../serial/serial.service';
import { IChangeValueDto } from '../interfaces/arduino.interface';

@Controller('arduino')
export class ArduinoController {
  constructor(private readonly serialService: SerialService) {}

  @Post('change-value')
  @HttpCode(200)
  changeValue(@Body() changeValueDto: IChangeValueDto): { data: {}; message: string } {
    console.log('Change value command received');
    console.log(changeValueDto);
    this.serialService.sendChangeValue(changeValueDto);
    return { data: {}, message: 'Change value command sent' };
  }
}
