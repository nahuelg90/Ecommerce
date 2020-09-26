import { TestBed } from '@angular/core/testing';

import { UsuariosBoService } from './usuarios-bo.service';

describe('UsuariosBoService', () => {
  let service: UsuariosBoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsuariosBoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
