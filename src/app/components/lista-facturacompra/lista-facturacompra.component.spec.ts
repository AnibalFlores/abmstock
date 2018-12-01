import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaFacturacompraComponent } from './lista-facturacompra.component';

describe('ListaFacturacompraComponent', () => {
  let component: ListaFacturacompraComponent;
  let fixture: ComponentFixture<ListaFacturacompraComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaFacturacompraComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaFacturacompraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
