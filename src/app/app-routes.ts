import { Routes } from '@angular/router';
import { HomepageComponent } from '@app/homepage/homepage.component';
import { SignInComponent } from '@app/security/sign-in/sign-in.component';
import { ServerErrorComponent } from '@app/server-error/server-error.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SetupComponent } from './setup/setup.component';

export const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'error', component: ServerErrorComponent },
  { path: 'setup', component: SetupComponent },
  { path: 'sign-in', component: SignInComponent },
  { path: '', component: HomepageComponent, pathMatch: 'full' },
];
