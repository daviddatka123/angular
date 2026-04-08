import { TestBed } from '@angular/core/testing';

import { Toolsservice } from './toolsservice';

describe('Toolsservice', () => {
  let service: Toolsservice;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Toolsservice);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
