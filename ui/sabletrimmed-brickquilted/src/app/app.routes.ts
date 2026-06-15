import { Routes } from '@angular/router';

import { ChartsModule } from './charts/charts-module';
import { DataFormsModule } from './forms/data-forms-module';
import { ImportExportModule } from './import-export/import-export-module';
import { TablesModule } from './tables/tables-module';
import { UserLoginModule } from './user-login/user-login-module';
import { SharedModule } from './shared/shared-module';


import { Login } from './user-login/components/login/login';
import { TablesOverview } from './tables/components/tables-overview/tables-overview';
import { ChartsOverview } from './charts/components/charts-overview/charts-overview';

import { FormsOverview } from './forms/components/forms-overview/forms-overview';
import { ImportExportOverview } from './import-export/components/import-export-overview/import-export-overview';
import { UserToolbar } from './toolbar/components/user-toolbar/user-toolbar';

import { loggedInGuard } from './logged-in-guard';

export const routes: Routes = [
  {
    path: '',
    title: 'Login',
    pathMatch: 'full',
    component: Login,
  },
  {
    path: 'login',
    title: 'Login',
    pathMatch: 'full',
    component: Login,
  },
  {
    path: 'tables',
    title: 'Tables',
    pathMatch: 'full',
    component: TablesOverview,
    canActivate: [loggedInGuard]
  },
  {
    path: 'charts',
    title: 'Charts',
    pathMatch: 'full',
    component: ChartsOverview,
    canActivate: [loggedInGuard]
  },
  {
    path: 'import-export',
    title: 'Import/Export',
    pathMatch: 'full',
    component: ImportExportOverview,
    canActivate: [loggedInGuard]
  },
  {
    path: 'forms',
    title: 'Forms',
    pathMatch: 'full',
    component: FormsOverview,
    canActivate: [loggedInGuard]
  },
];
