
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


magpieRoutes[0].children =routes[0].children.concat(magpieRoutes[0].children).filter((li, idx, self) => self.map(itm => itm.path).indexOf(li.path) === idx);
export const customRoutes:Routes  = magpieRoutes;

