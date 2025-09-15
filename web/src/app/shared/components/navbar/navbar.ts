import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatChipsModule} from '@angular/material/chips';
import {MatBadgeModule} from '@angular/material/badge';

@Component({
  selector: 'app-navbar',
  imports: [
    MatMenuModule,
    MatIconModule,
    MatChipsModule,
    MatBadgeModule
],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss'
})
export class Navbar {
  darkMode = false;
  
  toggleDarkMode() {
    document.body.classList.toggle('dark');
    this.darkMode = !this.darkMode;
  }
}
