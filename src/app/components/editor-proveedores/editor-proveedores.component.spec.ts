import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditorProveedoresComponent } from './editor-proveedores.component';

describe('EditorProveedoresComponent', () => {
  let component: EditorProveedoresComponent;
  let fixture: ComponentFixture<EditorProveedoresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditorProveedoresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditorProveedoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
