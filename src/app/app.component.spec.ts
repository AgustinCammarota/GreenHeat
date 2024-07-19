import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { By, Meta, Title } from '@angular/platform-browser';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture : ComponentFixture<AppComponent>;
  let titleService: Title;
  let metaService: Meta;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [Title, Meta]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    titleService = TestBed.inject(Title);
    metaService = TestBed.inject(Meta);
    fixture.detectChanges();
  });

  it('should create the AppComponent', () => {
    expect(component).toBeTruthy();
  });

  describe('Validate ngOnInit', () => {
    it('should set title correctly', () => {
      spyOn(titleService, 'setTitle').and.stub();
      component.ngOnInit();
      expect(titleService.setTitle).toHaveBeenCalledWith('Green Heat Clima - Climatización Sustentable');
    });

    it('should add meta tags correctly', () => {
      spyOn(metaService, 'addTags').and.stub();
      component.ngOnInit();
      expect(metaService.addTags).toHaveBeenCalledTimes(1);
      expect(metaService.addTags).toHaveBeenCalledWith([
        { name: 'description', content: 'Somos una empresa dedicada a la climatización sustentable en Argentina. Contamos con servicios de instalación, cotización y reparación de sistemas de calefacción / refrigeración.' },
        { name: 'keywords', content: 'Green Heat Clima, Argentina, Reparaciones, Sistemas de refrigeración, Sistemas de calefacción, Instalaciones, Reparaciones, Cotizaciones, Climatización, Calderas, Heladeras, Aires Acondicionados, Calefacción, Termotanques, Calefones, Piso Radiante, Losa Radiante.' },
        { name: 'author', content: 'Agustin Cammarota Muti' },
        { name: 'publisher', content: 'Cammarota' },
        { name: 'robots', content: 'index, follow' },
        { rel: 'canonical', href: 'https://greenheatclima.com.ar' }
      ]);
    });
  });

  describe('Validate dom elements', () => {
    it('should render router-outlet', () => {
      const element = fixture.debugElement.query(By.css('router-outlet')).nativeElement;
      expect(element).toBeTruthy();
    });
  });
});
