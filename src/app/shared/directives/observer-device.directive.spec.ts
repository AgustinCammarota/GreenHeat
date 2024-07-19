/* eslint-disable @typescript-eslint/no-explicit-any */
import { ObserverDeviceDirective } from './observer-device.directive';
import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

@Component({
  selector: 'app-host-component',
  imports: [
    ObserverDeviceDirective
  ],
  template: `
      <div appObserverDevice (mobileDeviceDetermined)="this.validateDirective($event)">Reference</div>
  `,
  standalone: true
})
class HostComponent {
  @ViewChild(ObserverDeviceDirective, { static: true }) observerDeviceDirective!: ObserverDeviceDirective;
  isMobileDevice: boolean = false;

  validateDirective(event: boolean): void {
    this.isMobileDevice = event;
  }
}

class ResizeObserverMock {
  observe = jasmine.createSpy('observe');
  unobserve = jasmine.createSpy('unobserve');
  disconnect = jasmine.createSpy('disconnect');
}

describe('ObserverDeviceDirective', () => {
  let component: HostComponent;
  let fixture: ComponentFixture<HostComponent>;
  const resizeObserverMock: ResizeObserverMock = new ResizeObserverMock();
  let directive: ObserverDeviceDirective;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ObserverDeviceDirective,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HostComponent);
    component = fixture.componentInstance;
    spyOn(window, 'ResizeObserver').and.returnValue(resizeObserverMock);
    fixture.detectChanges();
    directive = component.observerDeviceDirective;
    fixture.detectChanges();
    await fixture.whenStable();
    await fixture.whenRenderingDone();
  });

  afterEach(() => {
    resizeObserverMock.observe.calls.reset();
    resizeObserverMock.unobserve.calls.reset();
    resizeObserverMock.disconnect.calls.reset();
  });

  it('should create host component', () => {
    expect(component).toBeTruthy();
  });

  it('should have a directive element', () => {
    expect(directive).toBeTruthy();
  });

  it('should call validateDirective method when emit mobileDeviceDetermined event', () => {
    const spy = spyOn(component, 'validateDirective').and.stub();
    directive.mobileDeviceDetermined.emit(true);
    fixture.detectChanges();
    expect(spy).toHaveBeenCalled();
  });

  it('should emit a mobileDeviceDetermined in true when the device width is <= 900', (done) => {
    directive.mobileDeviceDetermined.subscribe(value => {
      expect(value).toBeTruthy();
      done();
    });

    (directive as any).validateEntries([{ contentRect: { width: 800 } }]);
  });

  it('should emit a mobileDeviceDetermined in false when the device width is > 900', (done) => {
    directive.mobileDeviceDetermined.subscribe(value => {
      expect(value).toBeFalsy();
      done();
    });

    (directive as any).validateEntries([{ contentRect: { width: 1000 } }]);
  });

  it('should emit a mobileDeviceDetermined in true when the device is mobile or tablet - case userAgent', (done) => {
    spyOnProperty(window.navigator, 'userAgent').and.returnValue('Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0 Mobile/15A372 Safari/604.1');
    directive.mobileDeviceDetermined.subscribe(value => {
      expect(value).toBeTruthy();
      done();
    });

    (directive as any).validateMobileDevice();
  });

  it('should emit a mobileDeviceDetermined in true when the device is mobile or tablet - case vendor', (done) => {
    spyOnProperty(window.navigator, 'userAgent').and.returnValue('');
    spyOnProperty(window.navigator, 'vendor').and.returnValue('android');
    directive.mobileDeviceDetermined.subscribe(value => {
      expect(value).toBeTruthy();
      done();
    });

    (directive as any).validateMobileDevice();
  });
});
