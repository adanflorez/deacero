import { Routes } from '@angular/router';
import { RoleGuard } from 'src/app/core/guards/role.guard';

const Routing: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule),
    data: { role: 'OSC' },
    canActivate: [RoleGuard],
  },
  {
    path: 'calls',
    loadChildren: () => import('./calls/calls.module').then(m => m.CallsModule),
    data: { role: 'OSC' },
    canActivate: [RoleGuard],
  },
  {
    path: 'call-alerts',
    loadChildren: () =>
      import('./call-alerts/call-alerts.module').then(m => m.CallAlertsModule),
    data: { role: 'OSC' },
    canActivate: [RoleGuard],
  },
  {
    path: 'user-management',
    loadChildren: () =>
      import('./user-management/user-management.module').then(
        m => m.UserManagementModule
      ),
    data: { role: 'ADMINISTRATOR' },
    canActivate: [RoleGuard],
  },
  {
    path: 'call-management',
    loadChildren: () =>
      import('./call-management/call-management.module').then(
        m => m.CallManagementModule
      ),
    data: { role: 'ADMINISTRATOR' },
    canActivate: [RoleGuard],
  },
  {
    path: 'multisite-management',
    loadChildren: () =>
      import('./multisite-management/multisite-management.module').then(
        m => m.MultisiteManagementModule
      ),
    data: { role: 'ADMINISTRATOR' },
    canActivate: [RoleGuard],
  },
  {
    path: 'requests',
    loadChildren: () => import('./requests').then(m => m.RequestsModule),
    data: { role: 'ADMINISTRATOR' },
    canActivate: [RoleGuard],
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
