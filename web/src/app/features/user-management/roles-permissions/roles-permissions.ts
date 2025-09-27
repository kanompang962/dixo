import { Component } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { Role } from "./role/role";

@Component({
  selector: 'app-roles-permissions',
  imports: [
    MatTabsModule,
    Role
],
  templateUrl: './roles-permissions.html',
  styleUrl: './roles-permissions.scss'
})
export class RolesPermissions {



}
