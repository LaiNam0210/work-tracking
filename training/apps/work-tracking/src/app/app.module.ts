import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { StoreReportModule } from '@training/store/report';

import { AppComponent } from './app.component';
import { ReportComponent } from './report/report.component';
import { ReportListComponent } from './report/report-list/report-list.component';
import { ReportItemComponent } from './report/report-list/report-item/report-item.component';
import { ReportCreatorComponent } from './report/report-creator/report-creator.component';
import { AppRoutingModule } from './app-routing.module';
import { ReportStartComponent } from './report/report-start/report-start.component';
import { NxModule } from '@nrwl/angular';
import { EffectsModule } from '@ngrx/effects';
import { routerReducer, StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { environment } from '../environments/environment';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AuthPageComponent } from './auth-page/auth-page.component';
import { HeaderComponent } from '@training/header';
import { AuthInterceptorService } from '@training/auth';
import { NotFoundPageComponent } from './not-found-page/not-found-page.component';
import { UnauthorizedPageComponent } from './unauthorized-page/unauthorized-page.component';
import { StoreAuthModule } from '@training/store/auth';

@NgModule({
  declarations: [
    AppComponent,
    ReportComponent,
    ReportListComponent,
    ReportItemComponent,
    ReportCreatorComponent,
    ReportStartComponent,
    AuthPageComponent,
    HeaderComponent,
    NotFoundPageComponent,
    UnauthorizedPageComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatButtonModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    StoreReportModule,
    StoreAuthModule,
    NxModule.forRoot(),
    EffectsModule.forRoot([]),
    StoreRouterConnectingModule.forRoot(),
    StoreModule.forRoot(
      { routerReducer },
      {
        metaReducers: !environment.production ? [] : [],
        runtimeChecks: {
          strictActionImmutability: true,
          strictStateImmutability: true
        }
      }
    ),
    !environment.production ? StoreDevtoolsModule.instrument() : []
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
