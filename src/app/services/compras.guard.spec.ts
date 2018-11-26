import { TestBed, async, inject } from '@angular/core/testing';

import { ComprasGuard } from './compras.guard';

describe('ComprasGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ComprasGuard]
    });
  });

  it('should ...', inject([ComprasGuard], (guard: ComprasGuard) => {
    expect(guard).toBeTruthy();
  }));
});
