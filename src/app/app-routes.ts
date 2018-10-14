import { Routes } from '@angular/router';
import { HomepageComponent } from '@app/homepage/homepage.component';
import { SignInComponent } from '@app/security/sign-in/sign-in.component';
import { ServerErrorComponent } from '@app/server-error/server-error.component';

export const routes: Routes = [
  { path: 'error', component: ServerErrorComponent },
  { path: 'sign-in', component: SignInComponent },
  { path: '', component: HomepageComponent, pathMatch: 'full' },
];
