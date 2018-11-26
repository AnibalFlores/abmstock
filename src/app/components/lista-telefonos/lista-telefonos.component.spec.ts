import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaTelefonosComponent } from './lista-telefonos.component';

describe('ListaTelefonosComponent', () => {
  let component: ListaTelefonosComponent;
  let fixture: ComponentFixture<ListaTelefonosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaTelefonosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaTelefonosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
