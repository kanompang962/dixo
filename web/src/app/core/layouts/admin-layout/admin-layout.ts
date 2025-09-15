import { Component } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Navbar } from "../../../shared/components/navbar/navbar";
import { MatIconModule } from '@angular/material/icon';
import { data_drawer } from '../../../shared/data/drawer';
import { Header } from "../../../shared/components/header/header";

@Component({
  selector: 'app-admin-layout',
  imports: [
    MatButtonModule,
    MatSidenavModule,
    RouterOutlet,
    Navbar,
    MatIconModule,
    RouterLink,
    Header
],
  templateUrl: './admin-layout.html',
  styleUrl: './admin-layout.scss'
})
export class AdminLayout {
  data_drawer = data_drawer;
}
