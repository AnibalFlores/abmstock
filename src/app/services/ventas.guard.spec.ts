import { TestBed, async, inject } from '@angular/core/testing';

import { VentasGuard } from './ventas.guard';

describe('VentasGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [VentasGuard]
    });
  });

  it('should ...', inject([VentasGuard], (guard: VentasGuard) => {
    expect(guard).toBeTruthy();
  }));
});
