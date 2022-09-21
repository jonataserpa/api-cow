import { Test, TestingModule } from '@nestjs/testing';
import { CattlesService } from './cattles.service';

describe('CattlesService', () => {
  let service: CattlesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CattlesService],
    }).compile();

    service = module.get<CattlesService>(CattlesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
