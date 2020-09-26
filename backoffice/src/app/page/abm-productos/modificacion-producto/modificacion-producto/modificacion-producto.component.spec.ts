import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificacionProductoComponent } from './modificacion-producto.component';

describe('ModificacionProductoComponent', () => {
  let component: ModificacionProductoComponent;
  let fixture: ComponentFixture<ModificacionProductoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModificacionProductoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModificacionProductoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
