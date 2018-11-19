import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditorArticulosComponent } from './editor-articulos.component';

describe('EditorArticulosComponent', () => {
  let component: EditorArticulosComponent;
  let fixture: ComponentFixture<EditorArticulosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditorArticulosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditorArticulosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
