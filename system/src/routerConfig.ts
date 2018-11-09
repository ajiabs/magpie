import { MagpieLoginComponent } from './components/admin/login/login.component';
import { MagpieDashboardComponent } from './components/admin/dashboard/dashboard.component';
import { MagpieIndexComponent } from './components/admin/index/index.component';
import { MagpieCreateComponent } from './components/admin/create/create.component';
import { MagpieEditComponent } from './components/admin/edit/edit.component';
import { MagpieViewComponent } from './components/admin/view/view.component';
import { MagpieProfileEditComponent } from './components/admin/profile-edit/profile-edit.component';
import { MagpieSettingsComponent } from './components/admin/settings/settings.component';
import { MagpiePackageInstallerComponent } from './components/admin/package-installer/package-installer.component';
import { MagpiePackageInstallerDetailsComponent } from './components/admin/package-installer/package-installer-details.component';
import { MagpieResetPasswordComponent } from './components/admin/reset-password/reset-password.component';
import { Routes,RouterModule } from '@angular/router';
import { customRoutes } from './../../src/app/routerConfig';
import { AuthGuard } from './services/admin/auth-guard.service';
import { ModuleWithProviders } from '@angular/core';


const mainRoutes = [

]
const routes:Routes = [ 
      {
         path: 'admin',
         children: [ 
            { path: '',
              component: MagpieLoginComponent,
              canActivate: [AuthGuard]
            }]},
        ...customRoutes,
        {
        path: 'admin',
        children: [ 
          { path: 'login',
            component: MagpieLoginComponent,
          },
          { path: 'reset-password',
            component: MagpieResetPasswordComponent,
          },
          { path: 'dashboard',
            component: MagpieDashboardComponent,
            canActivate: [AuthGuard],
            runGuardsAndResolvers: 'always',
          },
          { path: 'account',
            component: MagpieProfileEditComponent,
            canActivate: [AuthGuard],
            runGuardsAndResolvers: 'always',
          },
          { path: 'settings',
            component: MagpieSettingsComponent,
            canActivate: [AuthGuard],
            runGuardsAndResolvers: 'always',
          },
          { path: 'package-installer',
            component: MagpiePackageInstallerComponent,
            canActivate: [AuthGuard],
            runGuardsAndResolvers: 'always',
          },
          { path: 'package-installer/:pacakge',
            component: MagpiePackageInstallerDetailsComponent,
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
//customRoutes[0].children =customRoutes[0].children.concat(routes[0].children).filter((li, idx, self) => self.map(itm => itm.path).indexOf(li.path) === idx);
export const magpieRoutes:Routes  = routes;
