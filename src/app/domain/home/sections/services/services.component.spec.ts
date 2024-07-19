import { ComponentFixture, DeferBlockBehavior, DeferBlockFixture, DeferBlockState, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ServicesComponent } from './services.component';
import { By } from '@angular/platform-browser';

describe('ServicesComponent', () => {
  let component: ServicesComponent;
  let fixture: ComponentFixture<ServicesComponent>;
  let deferBlockFixture: DeferBlockFixture;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ServicesComponent,
        BrowserAnimationsModule
      ],
      deferBlockBehavior: DeferBlockBehavior.Manual
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ServicesComponent);
    component = fixture.componentInstance;
    deferBlockFixture = (await fixture.getDeferBlocks())[0];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a cards property', () => {
    expect(component.cards().length).toBe(6);
  });

  it('should have a presentation property', () => {
    expect(component.presentation()).toEqual({
      title: 'Los mejores servicios',
      subTitle: 'Te brindamos'
    });
  });

  describe('Validate dom elements', () => {
    it('should have a "app-title" element', () => {
      const element: HTMLElement = fixture.debugElement.query(By.css('app-title')).nativeElement;
      expect(element).toBeTruthy();
    });

    it('should have a "app-card" when the block is defer', async () => {
      await deferBlockFixture.render(DeferBlockState.Complete);
      const element: HTMLElement = fixture.debugElement.query(By.css('app-card')).nativeElement;
      expect(element).toBeTruthy();
    });

    it('should render the placeholder block', async () => {
      await deferBlockFixture.render(DeferBlockState.Placeholder);
      const element: HTMLElement = fixture.debugElement.query(By.css('.card-placeholder')).nativeElement;
      expect(element).toBeTruthy();
    });
  });
});
