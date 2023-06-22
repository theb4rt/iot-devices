import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { SerialService } from '../serial/serial.service';
import {
  IChangeValueDto,
  IGetActualValueDto,
} from '../interfaces/arduino.interface';
import { ArduinoService } from './arduino.service';

@Controller('arduino')
export class ArduinoController {
  constructor(
    private readonly serialService: SerialService,
    private readonly arduinoService: ArduinoService,
  ) {}

  @Post('change-value')
  @HttpCode(200)
  changeValue(@Body() changeValueDto: IChangeValueDto): {
    data: [];
    message: string;
  } {
    console.log('Change value command received');
    console.log(changeValueDto);
    this.serialService.sendChangeValue(changeValueDto);
    return { data: [], message: 'Change value command sent' };
  }

  @Post('get-values')
  @HttpCode(200)
  getActualValue(@Body() getActualValueDto: IGetActualValueDto): {
    data: [];
    message: string;
  } {
    console.log('Get Actual Value command received');
    console.log(getActualValueDto);
    this.arduinoService.getActualValues();
    // this.serialService.sendChangeValue(changeValueDto);
    return { data: [], message: 'Change value command sent' };
  }
}
