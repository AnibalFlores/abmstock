import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BorrarArticulosComponent } from './borrar-articulos.component';

describe('BorrarArticulosComponent', () => {
  let component: BorrarArticulosComponent;
  let fixture: ComponentFixture<BorrarArticulosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BorrarArticulosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BorrarArticulosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
