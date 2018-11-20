import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BorrarProveedoresComponent } from './borrar-proveedores.component';

describe('BorrarProveedoresComponent', () => {
  let component: BorrarProveedoresComponent;
  let fixture: ComponentFixture<BorrarProveedoresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BorrarProveedoresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BorrarProveedoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
