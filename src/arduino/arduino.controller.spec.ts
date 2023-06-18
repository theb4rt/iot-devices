import { Test, TestingModule } from '@nestjs/testing';
import { ArduinoController } from './arduino.controller';

describe('ArduinoController', () => {
  let controller: ArduinoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ArduinoController],
    }).compile();

    controller = module.get<ArduinoController>(ArduinoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
