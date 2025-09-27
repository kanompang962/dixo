import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDivider } from "@angular/material/divider";
import { IconButton } from "../icon-button/icon-button";

@Component({
  selector: 'app-title',
  imports: [MatDivider, IconButton],
  templateUrl: './title.html',
  styleUrl: './title.scss'
})
export class Title {
  @Input() title: string = '';
  @Input() labelButton: string = '';
  @Output() onClick = new EventEmitter<void>();

  click() {
    this.onClick.emit(); // ส่ง Event เมื่อคลิกปุ่ม
  }
}
