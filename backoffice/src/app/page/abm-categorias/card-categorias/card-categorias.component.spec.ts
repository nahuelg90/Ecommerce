import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardCategoriasComponent } from './card-categorias.component';

describe('CardCategoriasComponent', () => {
  let component: CardCategoriasComponent;
  let fixture: ComponentFixture<CardCategoriasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardCategoriasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardCategoriasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
