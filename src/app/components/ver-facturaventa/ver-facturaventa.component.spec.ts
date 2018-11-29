import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerFacturaventaComponent } from './ver-facturaventa.component';

describe('VerFacturaventaComponent', () => {
  let component: VerFacturaventaComponent;
  let fixture: ComponentFixture<VerFacturaventaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerFacturaventaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerFacturaventaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
