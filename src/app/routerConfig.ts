import { Routes,RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { AuthGuard } from './../../system/src/services/admin/auth-guard.service';
import { DashboardComponent } from './../../src/app/admin/components/dashboard/dashboard.component';


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
     }
    // , 
    // { path: '',
    //   redirectTo:"admin/login",
    //   pathMatch:"full"
    // }
        
   
];

export const customRoutes:Routes  = routes;
