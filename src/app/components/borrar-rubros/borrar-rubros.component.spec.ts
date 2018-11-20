import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BorrarRubrosComponent } from './borrar-rubros.component';

describe('BorrarRubrosComponent', () => {
  let component: BorrarRubrosComponent;
  let fixture: ComponentFixture<BorrarRubrosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BorrarRubrosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BorrarRubrosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
