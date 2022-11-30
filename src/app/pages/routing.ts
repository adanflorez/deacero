import { Routes } from '@angular/router';

const Routing: Routes = [
  {
    path: 'home',
    loadChildren: () =>
      import('./home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'calls',
    loadChildren: () =>
      import('./calls/calls.module').then((m) => m.CallsModule),
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
  // {
  //   path: '**',
  //   redirectTo: 'error/404',
  // },
];

export { Routing };
