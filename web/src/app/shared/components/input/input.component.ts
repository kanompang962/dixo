import { CommonModule } from '@angular/common';
import { Component, EventEmitter, forwardRef, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from "@angular/material/input";

@Component({
  selector: 'app-input',
  imports: [
    ReactiveFormsModule,
    CommonModule,
    MatInputModule
],
   providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true
    }
  ],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss'
})
export class InputComponent implements ControlValueAccessor{
  @Input() type: string = 'text';
  @Input() id: string = '';
  @Input() icon: string = '';
  @Input() row: number = 4;
  @Input() disabled: boolean = false;
  @Input() placeholder: string = '';
  @Input() inputValue: string = '';
  @Output() inputValueChange: EventEmitter<string> = new EventEmitter<string>();

  @Input() label: string = '';
  @Input() name: string = '';
  @Input() formControl: FormControl = new FormControl; // Use 'any' if you want to keep it flexible

  onChange: any = () => {};
  onTouched: any = () => {};

  writeValue(value: any): void {
    // Set the value from the form control
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    // Implement if needed
  }

  onInputChange(event: any): void {
    if (this.type == 'number') {
      this.onChange(parseInt(event.target.value));
    }else {
      this.onChange(event.target.value);
    }
  }

  onValueChange(value: string): void {
    this.inputValue = value;
    this.inputValueChange.emit(value);
  }
}
