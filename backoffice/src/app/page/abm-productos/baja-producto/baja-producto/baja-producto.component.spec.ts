import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BajaProductoComponent } from './baja-producto.component';

describe('BajaProductoComponent', () => {
  let component: BajaProductoComponent;
  let fixture: ComponentFixture<BajaProductoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BajaProductoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BajaProductoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
