import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditorTelefonosComponent } from './editor-telefonos.component';

describe('EditorTelefonosComponent', () => {
  let component: EditorTelefonosComponent;
  let fixture: ComponentFixture<EditorTelefonosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditorTelefonosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditorTelefonosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
