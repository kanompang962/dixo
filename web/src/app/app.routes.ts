import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./core/layouts/admin-layout/admin-layout').then((m) => m.AdminLayout),
    children: [
      {
        path: '',
        loadComponent: () => import('./features/home/home').then((m) => m.Home),
      },
      {
        path: 'user-management',
        // pathMatch: 'full',
        children: [
          {
            path: 'users',
            loadComponent: ()=> import('./features/user-management/users/users').then((m)=> m.Users), 
          },
          {
            path: 'roles-permissions',
            loadComponent: ()=> import('./features/user-management/roles-permissions/roles-permissions').then((m)=> m.RolesPermissions), 
          }
        ]
      },
    ]
  },
  // {
  //   path: '',
  //   redirectTo: 'auth/signin',
  //   pathMatch: 'full',
  // },
  {
    path: 'auth',
    children: [
      {
        path: '',
        redirectTo: 'signin',
        pathMatch: 'full',
      },
      {
        path: 'signin',
        loadComponent: () => import('./features/auth/sign-in/sign-in').then((m) => m.SignIn),
      },
      {
        path: 'signup',
        loadComponent: () => import('./features/auth/sign-up/sign-up').then((m) => m.SignUp),
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'auth/signin',
    pathMatch: 'full',
  },
];
