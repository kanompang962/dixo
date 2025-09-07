import { TestBed } from '@angular/core/testing';
import { App } from './app';
import { of } from 'rxjs';
import { HealthModel } from './core/models/health.model';
import { HealthService } from './shared/services/health-service/health-service';

describe('AppComponent', () => {
  let mockHealthService: Partial<HealthService>;

  beforeEach(async () => {
    // mock service แบบ Jasmine-friendly
    mockHealthService = {
      getHealth: () => of(new HealthModel({ 
        status: 'Healthy', 
        timestamp: new Date('2025-09-07T14:00:00Z') 
      }))
    };

    await TestBed.configureTestingModule({
      imports: [App],
      providers: [
        { provide: HealthService, useValue: mockHealthService }
      ]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render title and health info', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges(); // trigger ngOnInit

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Dixo ERP');
    expect(compiled.querySelector('h2')?.textContent).toContain('Healthy');
    expect(compiled.querySelector('h3')?.textContent).toContain('2025');
  });
});
