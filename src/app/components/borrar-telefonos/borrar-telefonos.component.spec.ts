import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BorrarTelefonosComponent } from './borrar-telefonos.component';

describe('BorrarTelefonosComponent', () => {
  let component: BorrarTelefonosComponent;
  let fixture: ComponentFixture<BorrarTelefonosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BorrarTelefonosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BorrarTelefonosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
