import { TestBed } from '@angular/core/testing';

import { AnalyticsService } from './analytics.service';
import { WindowsReferenceService } from '@shared/services/windows-reference.service';

// Mock class for WindowsReferenceService
class MockWindowsReferenceService {
  nativeWindow: {
    dataLayer?: {
      push: jasmine.Spy
    } | null;
  } = {
    dataLayer: {
      push: jasmine.createSpy('push')
    }
  };
}

describe('AnalyticsService', () => {
  let service: AnalyticsService;
  let windowService: MockWindowsReferenceService;

  beforeEach(() => {
    windowService = new MockWindowsReferenceService();
    TestBed.configureTestingModule({
      providers: [
        { provide: WindowsReferenceService, useValue: windowService }
      ]
    });
    service = TestBed.inject(AnalyticsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('Method pageView', () => {
    it('should set the dataLayer', () => {
      const pageName = 'HomePage';
      service.pageView(pageName);
      expect(windowService.nativeWindow.dataLayer?.push).toHaveBeenCalledWith({
        event: 'page-view',
        pageName
      });
    });

    it('should not push page view if dataLayer is not available', () => {
      windowService.nativeWindow.dataLayer = null;

      service.pageView('HomePage');

      expect(windowService.nativeWindow.dataLayer).toBeNull();
    });
  });

  describe('Method customEvent', () => {
    it('should set the dataLayer', () => {
      const link = 'Link Facebook';
      service.customEvent(link);
      expect(windowService.nativeWindow.dataLayer?.push).toHaveBeenCalledWith({
        event: 'page-custom-event',
        data: link
      });
    });

    it('should not push link interaction if dataLayer is not available', () => {
      windowService.nativeWindow.dataLayer = null;

      service.customEvent('Link Facebook');

      expect(windowService.nativeWindow.dataLayer).toBeNull();
    });
  });
});
