import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth/signin',
    pathMatch: 'full',
  },
  {
    path: 'auth',
    children: [
      {
        path: 'signin',
        loadComponent: () =>
          import('./features/auth/sign-in/sign-in').then(
            (m) => m.SignIn
          ),
      },
      {
        path: 'signup',
        loadComponent: () =>
          import('./features/auth/sign-up/sign-up').then(
            (m) => m.SignUp
          ),
      },
    ],
  },
  {
    path: '**',
    loadComponent: () =>
      import('./app').then(
        (m) => m.App
      ),
  },
];
