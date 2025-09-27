import { Component } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Navbar } from "../../../shared/components/navbar/navbar";
import { MatIconModule } from '@angular/material/icon';
import { MatTreeModule } from '@angular/material/tree';
import { data_drawer } from '../../../shared/data/drawer';
import { Header } from "../../../shared/components/header/header";
import {MatTabsModule} from '@angular/material/tabs';

interface FoodNode {
  name: string;
  link: string;
  icon: string;
  children?: FoodNode[];
}

const EXAMPLE_DATA: FoodNode[] = [
  {
    name: 'Dashboard',
    link: '/',
    icon: 'home'
  },
  {
    name: 'User Management',
    link: '',
    icon: 'group',
    children: [
      { name: 'Users', link: '/user-management/users', icon: 'manage_accounts' }, 
      { name: 'Roles & Permissions', link: '/user-management/roles-permissions', icon: 'admin_panel_settings' }, 
    ],
  },
  // {
  //   name: 'Vegetables',
  //   children: [
  //     {
  //       name: 'Green',
  //       children: [{name: 'Broccoli'}, {name: 'Brussels sprouts'}],
  //     },
  //     {
  //       name: 'Orange',
  //       children: [{name: 'Pumpkins'}, {name: 'Carrots'}],
  //     },
  //   ],
  // },
];

@Component({
  selector: 'app-admin-layout',
  imports: [
    MatButtonModule,
    MatSidenavModule,
    RouterOutlet,
    Navbar,
    MatIconModule,
    RouterLink,
    Header,
    MatTreeModule,
    MatTabsModule
],
  templateUrl: './admin-layout.html',
  styleUrl: './admin-layout.scss'
})
export class AdminLayout {
  // Sidenav
  data_drawer = data_drawer;
  // Tree
  dataSource = EXAMPLE_DATA;
  childrenAccessor = (node: FoodNode) => node.children ?? [];
  hasChild = (_: number, node: FoodNode) => !!node.children && node.children.length > 0;
}
