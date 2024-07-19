import { TestBed } from '@angular/core/testing';

import { WindowsReferenceService } from './windows-reference.service';

describe('WindowsReferenceService', () => {
  let service: WindowsReferenceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WindowsReferenceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Validate windows getter', () => {
    expect(service.nativeWindow).toBe(window);
  });
});
