import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerFacturacompraComponent } from './ver-facturacompra.component';

describe('VerFacturacompraComponent', () => {
  let component: VerFacturacompraComponent;
  let fixture: ComponentFixture<VerFacturacompraComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerFacturacompraComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerFacturacompraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
