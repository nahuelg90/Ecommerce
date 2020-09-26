import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BajaCategoriaComponent } from './baja-categoria.component';

describe('BajaCategoriaComponent', () => {
  let component: BajaCategoriaComponent;
  let fixture: ComponentFixture<BajaCategoriaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BajaCategoriaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BajaCategoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
