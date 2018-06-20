
import { Routes } from '@angular/router';
import { UserLoginComponent } from './components/users/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard/dashboard.component';

import { SectionEditComponent } from './components/sections/edit/edit.component';
import { SectionIndexComponent } from './components/sections/index/index.component';
import { SectionCreateComponent } from './components/sections/create/create.component';
import { AuthGuard } from './auth-guard.service';
export const appRoutes: Routes = [

  {
    path: 'admin',
    children: [ 
      { path: 'login',
        component: UserLoginComponent
      },
      { path: 'dashboard',
        component: DashboardComponent,
        canActivate: [AuthGuard]
      },

      { path: ':section/create', 
        component: SectionCreateComponent,
        canActivate: [AuthGuard]
      },
      {
        path: ':section/edit/:id',
        component: SectionEditComponent,
        canActivate: [AuthGuard]
      },
      { path: ':section',
        component: SectionIndexComponent,
        canActivate: [AuthGuard]
      }
    ]
  },

 

];

