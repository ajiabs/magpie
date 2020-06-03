import { Routes,RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { AuthGuard } from './../../system/src/services/admin/auth-guard.service';
import { DashboardComponent } from './../../src/app/admin/components/dashboard/dashboard.component';
import { UsersIndexComponent } from './../../src/app/admin/components/users/index/index.component';
import { RolesViewComponent } from './../../src/app/admin/components/roles/view/view.component';
import { HomeComponent } from './../../src/app/site/components/home/home.component';

  const routes:Routes = [
    {
      path: 'cms',
      children: [ 
        { path: ':role/dashboard',
          component:DashboardComponent,
          canActivate: [AuthGuard],
          runGuardsAndResolvers: 'always',
        },
        { path: 'users',
          component:UsersIndexComponent,
          canActivate: [AuthGuard],
          runGuardsAndResolvers: 'always',
        },
        {
          path: 'roles/view/:id',
          component: RolesViewComponent,
          canActivate: [AuthGuard],
          runGuardsAndResolvers: 'always',
        },
      ]
    },
    {
      path: 'admin',
      children: [ 
        { path: 'dashboard',
          component:DashboardComponent,
          canActivate: [AuthGuard],
          runGuardsAndResolvers: 'always',
        },
        { path: 'users',
          component:UsersIndexComponent,
          canActivate: [AuthGuard],
          runGuardsAndResolvers: 'always',
        },
        {
          path: 'roles/view/:id',
          component: RolesViewComponent,
          canActivate: [AuthGuard],
          runGuardsAndResolvers: 'always',
        },
      ]
     },
     {  path: '',
         component:HomeComponent,
         runGuardsAndResolvers: 'always',
     }
    
        
   
];

export const customRoutes:Routes  = routes;
