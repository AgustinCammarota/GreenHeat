/* eslint-disable @typescript-eslint/no-explicit-any */
import { ObserverVisibilityDirective } from './observer-visibility.directive';
import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

@Component({
  selector: 'app-host-component',
  imports: [
    ObserverVisibilityDirective

  ],
  template: `
      <div appObserverVisibility (scrolledToTop)="this.validateDirective($event)">Reference</div>
  `,
  standalone: true
}) class HostComponent {
  @ViewChild(ObserverVisibilityDirective, { static: true }) observerVisibilityDirective!: ObserverVisibilityDirective;
  isScrolledToTop: boolean = false;

  validateDirective(event: boolean): void {
    this.isScrolledToTop = event;
  }
}

class IntersectionObserver {
  observe = jasmine.createSpy('observe');
  unobserve = jasmine.createSpy('unobserve');
  disconnect = jasmine.createSpy('disconnect');
  takeRecords = jasmine.createSpy('takeRecords');
  constructor(public callback: IntersectionObserverCallback, public options?: IntersectionObserverInit) {}
}

describe('ObserverVisibilityDirective', () => {
  let component: HostComponent;
  let fixture: ComponentFixture<HostComponent>;
  let directive: ObserverVisibilityDirective;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ObserverVisibilityDirective
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HostComponent);
    component = fixture.componentInstance;
    // Spy on the IntersectionObserver constructor
    spyOn(window as any, 'IntersectionObserver').and.callFake((callback: IntersectionObserverCallback, options?: IntersectionObserverInit) => {
      return new IntersectionObserver(callback, options);
    });
    fixture.detectChanges();
    directive = component.observerVisibilityDirective;
    fixture.detectChanges();
    await fixture.whenStable();
    await fixture.whenRenderingDone();
  });

  it('should create host component', () => {
    expect(component).toBeTruthy();
  });

  it('should have a directive element', () => {
    expect(directive).toBeTruthy();
  });

  it('should call validateDirective method when emit mobileDeviceDetermined event', () => {
    const spy = spyOn(component, 'validateDirective').and.stub();
    directive.scrolledToTop.emit(true);
    fixture.detectChanges();
    expect(spy).toHaveBeenCalled();
  });
});
