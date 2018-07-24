
import { Routes,RouterModule } from '@angular/router';
import { magpieRoutes } from './../../../system/src/routerConfig'; 
import { DashboardComponent } from './../../../src/app/admin/components/dashboard/dashboard.component';
import { AuthGuard } from './../../../system/src/services/admin/auth-guard.service';
const routes:Routes = [
  {
    path: 'admin',
    children: [ 
      { path: 'dashboard',
        component:DashboardComponent,
        canActivate: [AuthGuard],
        runGuardsAndResolvers: 'always',
      }]
  }];
//const routes:Routes = [];
  

export const customRoutes:Routes  = routes.concat(magpieRoutes);

