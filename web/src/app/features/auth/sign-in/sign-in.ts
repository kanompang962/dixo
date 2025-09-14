import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { MatInputModule } from '@angular/material/input';
import {MatDividerModule} from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sign-in',
  imports: [
    MatButtonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatCardModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatDividerModule,
    MatIconModule,
    CommonModule
    ],
  templateUrl: './sign-in.html',
  styleUrl: './sign-in.scss'
})

export class SignIn {
  signInForm: FormGroup;
  darkMode = false;

  constructor(private fb: FormBuilder) {
    this.signInForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  toggleDarkMode() {
    document.body.classList.toggle('dark');
    this.darkMode = !this.darkMode;
  }

  onSubmit() {
    if (this.signInForm.valid) {
      console.log('Form Values:', this.signInForm.value);
      // 🔹 ต่อไปค่อย call API login
    }
  }
}
