import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AltaCategoriaComponent } from './alta-categoria.component';

describe('AltaCategoriaComponent', () => {
  let component: AltaCategoriaComponent;
  let fixture: ComponentFixture<AltaCategoriaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AltaCategoriaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AltaCategoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
