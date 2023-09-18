import { TestBed } from '@angular/core/testing';
import { StockRolesService } from './stock-roles.service';

describe('StockTypesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StockRolesService = TestBed.get(StockRolesService);
    expect(service).toBeTruthy();
  });
});
