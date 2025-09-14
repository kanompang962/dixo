import { Component } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import { RouterOutlet } from '@angular/router';
import { Navbar } from "../../../shared/components/navbar/navbar";
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-admin-layout',
  imports: [
    MatButtonModule,
    MatSidenavModule,
    RouterOutlet,
    Navbar,
    MatIconModule
],
  templateUrl: './admin-layout.html',
  styleUrl: './admin-layout.scss'
})
export class AdminLayout {

}
