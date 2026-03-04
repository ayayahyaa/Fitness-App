import { DifficultyLevelsService } from './difficulty-levels.service';
import { TestBed } from '@angular/core/testing';


describe('DifficultyLevels', () => {
  let service: DifficultyLevelsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DifficultyLevelsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
