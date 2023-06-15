import { Test, TestingModule } from '@nestjs/testing';
import { SerialService } from './serial.service';

describe('SerialService', () => {
  let service: SerialService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SerialService],
    }).compile();

    service = module.get<SerialService>(SerialService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
