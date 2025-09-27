import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RolesPermissions } from './roles-permissions';
import { provideHttpClient } from '@angular/common/http';


describe('RolesPermissions', () => {
  let component: RolesPermissions;
  let fixture: ComponentFixture<RolesPermissions>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RolesPermissions],
      providers: [provideHttpClient()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RolesPermissions);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
