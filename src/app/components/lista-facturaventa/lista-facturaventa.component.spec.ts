import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaFacturaventaComponent } from './lista-facturaventa.component';

describe('ListaFacturaventaComponent', () => {
  let component: ListaFacturaventaComponent;
  let fixture: ComponentFixture<ListaFacturaventaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaFacturaventaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaFacturaventaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
