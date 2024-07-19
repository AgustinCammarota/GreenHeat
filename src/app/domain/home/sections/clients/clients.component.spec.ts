import { ComponentFixture, DeferBlockBehavior, DeferBlockFixture, DeferBlockState, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ClientsComponent } from './clients.component';
import { By } from '@angular/platform-browser';

describe('ClientsComponent', () => {
  let component: ClientsComponent;
  let fixture: ComponentFixture<ClientsComponent>;
  let deferBlockFixture: DeferBlockFixture;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ClientsComponent,
        BrowserAnimationsModule
      ],
      deferBlockBehavior: DeferBlockBehavior.Manual
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ClientsComponent);
    component = fixture.componentInstance;
    deferBlockFixture = (await fixture.getDeferBlocks())[0];
    fixture.detectChanges();
  });

  it('should create', async() => {
    expect(deferBlockFixture).toBeDefined();
    expect(component).toBeTruthy();
  });

  it('should validate properties initialization', () => {
    expect(component.presentation()).toEqual({title: 'Las mejores marcas', subTitle: 'Trabajamos con'});
    expect(component.brands().length).toBe(6);
  });

  describe('Validate dom elements', () => {
    it('should have a "app-title" element', () => {
      const element = fixture.debugElement.query(By.css('app-title'));
      expect(element).toBeTruthy();
    });

    it('should have a "app-brand" element - defer block', async () => {
      await deferBlockFixture.render(DeferBlockState.Complete);
      const element = fixture.debugElement.query(By.css('app-brand'));
      expect(element).toBeTruthy();
    });

    it('should have a "h2" element - placeholder block', async () => {
      await deferBlockFixture.render(DeferBlockState.Placeholder);
      const element = fixture.debugElement.query(By.css('.brand-placeholder'));
      expect(element).toBeTruthy();
    });
  });
});
