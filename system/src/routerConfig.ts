import { MagpieLoginComponent } from './components/admin/login/login.component';
import { MagpieDashboardComponent } from './components/admin/dashboard/dashboard.component';
import { MagpieIndexComponent } from './components/admin/index/index.component';
import { MagpieCreateComponent } from './components/admin/create/create.component';
import { MagpieEditComponent } from './components/admin/edit/edit.component';
import { MagpieViewComponent } from './components/admin/view/view.component';
import { Routes,RouterModule } from '@angular/router';
import { AuthGuard } from './services/admin/auth-guard.service';
export const magpieRoutes:Routes = [
      {
        path: 'admin',
        children: [ 
          { path: 'login',
            component: MagpieLoginComponent
          },
          { path: 'dashboard',
            component: MagpieDashboardComponent,
            canActivate: [AuthGuard],
            runGuardsAndResolvers: 'always',
          },
          { path: ':section/create', 
            component: MagpieCreateComponent,
            canActivate: [AuthGuard],
            runGuardsAndResolvers: 'always',
          },
          {
            path: ':section/edit/:id',
            component: MagpieEditComponent,
            canActivate: [AuthGuard],
            runGuardsAndResolvers: 'always',
          },
          {
            path: ':section/view/:id',
            component: MagpieViewComponent,
            canActivate: [AuthGuard],
            runGuardsAndResolvers: 'always',
          },
          { path: ':section',
            component: MagpieIndexComponent,
            canActivate: [AuthGuard],
            runGuardsAndResolvers: 'always',
           }
         ]
       }
];

