import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditorClientesComponent } from './editor-clientes.component';

describe('EditorClientesComponent', () => {
  let component: EditorClientesComponent;
  let fixture: ComponentFixture<EditorClientesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditorClientesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditorClientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
