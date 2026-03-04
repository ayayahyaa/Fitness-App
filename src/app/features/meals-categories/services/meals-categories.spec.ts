import { TestBed } from '@angular/core/testing';

import { MealsCategories } from './meals-categories';

describe('MealsCategories', () => {
  let service: MealsCategories;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MealsCategories);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
