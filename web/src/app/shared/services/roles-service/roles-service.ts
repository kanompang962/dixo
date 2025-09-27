import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CreateRoleModel, RoleModel } from '../../../core/models/user-management-model/role.model';
import { APIResponse } from '../../../core/models/http.model';

@Injectable({
  providedIn: 'root'
})
export class RolesService {
  private apiUrl = environment.apiUrl; // ← ใช้จาก environment

  constructor(private http: HttpClient) {}

  getRoles(): Observable<APIResponse<RoleModel[]>> {
    return this.http.get<APIResponse<RoleModel[]>>(`${this.apiUrl}/role`)
  }

  createRole(payload: CreateRoleModel): Observable<APIResponse> {
    return this.http.post<APIResponse>(`${this.apiUrl}/role/create`, payload)
  }
}
