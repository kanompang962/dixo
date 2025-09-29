import { Component, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { InputComponent } from "../../../../input/input.component";
import { RoleDialogData } from '../../../../../../core/models/user-management-model/role.model';
import { IconButton } from "../../../../icon-button/icon-button";
import { MatDivider } from "@angular/material/divider";


@Component({
  selector: 'app-role-dialog',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    InputComponent,
    IconButton,
    MatDivider
],
  templateUrl: './role-dialog.html',
  styleUrl: './role-dialog.scss'
})
export class RoleDialog {
  readonly dialogRef = inject(MatDialogRef<RoleDialog>);
  readonly data = inject<RoleDialogData>(MAT_DIALOG_DATA);

 onNoClick(): void {
    this.dialogRef.close();
  }
}
