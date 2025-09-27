import { Component, inject, model, signal } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { CreateRoleModel, RoleForm, RoleModel } from '../../../../core/models/user-management-model/role.model';
import { RolesService } from '../../../../shared/services/roles-service/roles-service';
import { MatPaginator } from '@angular/material/paginator';
import { MatCard, MatCardContent } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { Title } from "../../../../shared/components/title/title";
import { RoleDialog } from '../../../../shared/components/dialogs/user-management-dialog/roles-permissions-dialog/role-dialog/role-dialog';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoadingService } from '../../../../shared/services/loading-service/loading-service';

@Component({
  selector: 'app-role',
  imports: [
    MatTableModule,
    MatCard,
    MatCardContent,
    MatProgressBarModule,
    MatPaginator,
    Title,
    ReactiveFormsModule
],
  templateUrl: './role.html',
  styleUrl: './role.scss'
})
export class Role {
  public loadingService = inject(LoadingService);
  roles: RoleModel[] = [];
  displayedColumns: string[] = ['position', 'name', 'normalizedName', 'actions'];
  dataSource = new MatTableDataSource<RoleModel>([]);

  readonly animal = signal('');
  readonly name = model('');
  readonly dialog = inject(MatDialog);

  roleForm: FormGroup<RoleForm>;

  constructor(
    private _rolesService: RolesService,
    private fb: FormBuilder
  ){
    this.roleForm = this.fb.group<RoleForm>({
     name: this.fb.control('test', { 
        validators: [Validators.required],
        nonNullable: true 
      })
    })
  }

  ngOnInit(): void {
    this.getRoles();
  }

  getRoles(){
    this._rolesService.getRoles().subscribe({
      next: (data) => {
        this.roles = data.data
        this.dataSource.data = this.roles; // อัพเดท dataSource
      },
      error: (err) => console.log(err),
    })
  }

  createRole(roleName: string){
    const payload: CreateRoleModel = { name: roleName };
    this._rolesService.createRole(payload).subscribe({
      next: (res)=> this.getRoles(),
      error: (err) => console.log(err),
    })
  }

  // เพิ่ม filter function (optional)
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    // Reset pagination เมื่อ filter
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  addRole() {
    console.log(this.roleForm.controls.name.value)
    const dialogRef = this.dialog.open(RoleDialog, {
      data: { 
        formGroup: this.roleForm // ส่งเป็น object
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      this.createRole(this.roleForm.controls.name.value)
    });
  }

  editRole(role: RoleModel) {
    console.log('Edit role:', role);
  }

  deleteRole(role: RoleModel) {
    console.log('Delete role:', role);
  }
}
