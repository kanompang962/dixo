import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Role } from './role';
import { RolesService } from '../../../../shared/services/roles-service/roles-service';
import { MatDialog } from '@angular/material/dialog';
import { CreateRoleModel, RoleModel } from '../../../../core/models/user-management-model/role.model';
import { of, throwError } from 'rxjs';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { LoadingService } from '../../../../shared/services/loading-service/loading-service';
import { MatTableDataSource } from '@angular/material/table';
import { APIResponse } from '../../../../core/models/http.model';

describe('Role', () => {
  let component: Role;
  let fixture: ComponentFixture<Role>;
  let rolesService: jest.Mocked<RolesService>;
  let dialog: jest.Mocked<MatDialog>;

  const mockRoles: RoleModel[] = [
    { name: 'Admin', normalizedName: 'ADMIN' },
    { name: 'User', normalizedName: 'USER' }
  ];

  const mockApiResponse: APIResponse<RoleModel[]> = {
    message: 'ok',
    data: mockRoles
  };

  beforeEach(async () => {
    const rolesServiceMock: jest.Mocked<RolesService> = {
      getRoles: jest.fn().mockReturnValue(of(mockApiResponse)),
      createRole: jest.fn()
    } as any;

    const dialogMock: jest.Mocked<MatDialog> = {
      open: jest.fn().mockReturnValue({
        afterClosed: () => of(true)
      })
    } as any;

    await TestBed.configureTestingModule({
      imports: [
        Role,
        ReactiveFormsModule,
      ],
      providers: [
        FormBuilder,
        { provide: RolesService, useValue: rolesServiceMock },
        // { provide: LoadingService, useValue: { show: jest.fn(), hide: jest.fn() } },
        { provide: MatDialog, useValue: dialogMock }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Role);
    component = fixture.componentInstance;
    fixture.detectChanges();
    rolesService = TestBed.inject(RolesService) as jest.Mocked<RolesService>;
    dialog = TestBed.inject(MatDialog) as jest.Mocked<MatDialog>;
  });

 it('should create the component', () => {
    fixture.detectChanges(); // trigger ngOnInit
    expect(component).toBeTruthy();
    expect(component.roleForm.controls.name.value).toBe('test');
  });



});
