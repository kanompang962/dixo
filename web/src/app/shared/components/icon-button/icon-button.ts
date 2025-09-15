import { Component, Input } from '@angular/core';
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
  @Input() type: 'add' | 'edit' | 'delete'| '' = '' ;
  
  ngOnInit() {
    console.log(this.type)
  }
}
