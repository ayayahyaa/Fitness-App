import { TestBed } from '@angular/core/testing';

import { MusclesServices } from './muscles-services';

describe('Muscles', () => {
  let service: MusclesServices;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MusclesServices);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
