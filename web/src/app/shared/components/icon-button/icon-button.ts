import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIconModule } from "@angular/material/icon";
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-icon-button',
  imports: [MatIconModule, NgClass],
  templateUrl: './icon-button.html',
  styleUrls: ['./icon-button.scss']
})
export class IconButton {
  @Input() icon: string = '';
  @Input() title: string = '';
  @Input() class: string = '';
  @Input() variant: 'add' | 'edit' | 'delete'| '' = '' ;
  @Output() onClick = new EventEmitter<void>();

  click() {
    this.onClick.emit(); // ส่ง Event เมื่อคลิกปุ่ม
  }
}
