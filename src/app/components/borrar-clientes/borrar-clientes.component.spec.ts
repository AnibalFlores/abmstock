import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BorrarClientesComponent } from './borrar-clientes.component';

describe('BorrarClientesComponent', () => {
  let component: BorrarClientesComponent;
  let fixture: ComponentFixture<BorrarClientesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BorrarClientesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BorrarClientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
