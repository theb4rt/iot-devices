import { Test, TestingModule } from '@nestjs/testing';
import { ArduinoService } from './arduino.service';

describe('ArduinoService', () => {
  let service: ArduinoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ArduinoService],
    }).compile();

    service = module.get<ArduinoService>(ArduinoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
