import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminLayout } from './admin-layout';
import { provideRouter } from '@angular/router';
import { Component } from '@angular/core';

// Dummy component สำหรับ router-outlet
@Component({
  standalone: true,
  template: `<p>Dummy Works!</p>`
})
class DummyComponent {}

describe('AdminLayout', () => {
  let component: AdminLayout;
  let fixture: ComponentFixture<AdminLayout>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminLayout], // standalone component
      providers: [
        provideRouter([
          { path: '', component: DummyComponent },
          { path: 'user-management', component: DummyComponent },
          { path: 'items', component: DummyComponent },
        ])
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AdminLayout);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render drawer items', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Dashboard');
    expect(compiled.textContent).toContain('User Management');
    expect(compiled.textContent).toContain('Items');
  });
});
