import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificacionCategoriaComponent } from './modificacion-categoria.component';

describe('ModificacionCategoriaComponent', () => {
  let component: ModificacionCategoriaComponent;
  let fixture: ComponentFixture<ModificacionCategoriaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModificacionCategoriaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModificacionCategoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
