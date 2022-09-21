import { Test, TestingModule } from '@nestjs/testing';
import { CattlesController } from './cattles.controller';
import { CattlesService } from './cattles.service';

describe('CattlesController', () => {
  let controller: CattlesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CattlesController],
      providers: [CattlesService],
    }).compile();

    controller = module.get<CattlesController>(CattlesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
