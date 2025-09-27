// export class RoleModel {
//     name: string | undefined;
//     normalizedName: string | undefined;

import { FormControl, FormGroup } from "@angular/forms";

//     constructor(data: Partial<RoleModel> = {}){
//         Object.assign(this, data);
//     }
// }

export interface RoleModel {
  name: string;
  normalizedName: string;

}
export interface CreateRoleModel {
  name: string;
}

export interface RoleForm {
  name: FormControl<string>;
}

export interface RoleDialogData {
  formGroup: FormGroup<RoleForm>;
}
