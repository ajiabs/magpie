import { Routes,RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { AuthGuard } from './../../system/src/services/admin/auth-guard.service';
import { DashboardComponent } from './../../src/app/admin/components/dashboard/dashboard.component';
import { HomeComponent } from './../../src/app/site/components/home/home.component';

  const routes:Routes = [
    {
      path: 'admin',
      children: [ 
        { path: 'dashboard',
          component:DashboardComponent,
          canActivate: [AuthGuard],
          runGuardsAndResolvers: 'always',
        },
      ]
     },
     {  path: '',
         component:HomeComponent,
         runGuardsAndResolvers: 'always',
     }
    // , 
    // { path: 'admin/dashboard',
    //   redirectTo:"admin/users",
    //   pathMatch:"full"
    // }
        
   
];

export const customRoutes:Routes  = routes;
