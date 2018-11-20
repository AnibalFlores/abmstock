import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditorRubrosComponent } from './editor-rubros.component';

describe('EditorRubrosComponent', () => {
  let component: EditorRubrosComponent;
  let fixture: ComponentFixture<EditorRubrosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditorRubrosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditorRubrosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
