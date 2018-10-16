import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { routes } from '@app/app-routes';
import { AppRootComponent } from './app-root/app-root.component';
import { AppRootModule } from './app-root/app-root.module';
import { CoreModule } from './core/core.module';
import { LogLevel } from './core/logger/logger-config';
import { DashboardModule } from './dashboard/dashboard.module';
import { GapiModule } from './gapi/gapi.module';
import { HomepageModule } from './homepage/homepage.module';
import { SecurityModule } from './security/security.module';
import { ServerErrorModule } from './server-error/server-error.module';
import { SharedModule } from './shared/shared.module';
import { SetupModule } from './setup/setup.module';

@NgModule({
  declarations: [],
  imports: [
    // The first two modules need to be BrowserAnimationsModule and SharedModule.
    BrowserAnimationsModule,
    SharedModule,
    AppRootModule,
    CoreModule.forRoot({ keyPrefix: 'DailySpendLimit' }, { logLevel: LogLevel.Warn }),
    DashboardModule,
    GapiModule,
    HomepageModule,
    RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' }),
    SecurityModule,
    ServerErrorModule,
    SetupModule,
  ],
  bootstrap: [AppRootComponent]
})
export class AppModule { }
