import { TestBed } from '@angular/core/testing';

import { CategoryResetService } from './category-reset.service';

describe('CategoryResetService', () => {
  let service: CategoryResetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CategoryResetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
