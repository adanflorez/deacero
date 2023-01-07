import { Routes } from '@angular/router';
import { RoleGuard } from 'src/app/lib/guards/role.guard';

const Routing: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule),
    data: { role: 'CLIENT' },
    canActivate: [RoleGuard],
  },
  {
    path: 'calls',
    loadChildren: () => import('./calls/calls.module').then(m => m.CallsModule),
    data: { role: 'CLIENT' },
    canActivate: [RoleGuard],
  },
  {
    path: 'call-alerts',
    loadChildren: () =>
      import('./call-alerts/call-alerts.module').then(m => m.CallAlertsModule),
    data: { role: 'CLIENT' },
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
