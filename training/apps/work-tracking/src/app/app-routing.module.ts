import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReportDetailComponent } from './report/report-detail/report-detail.component';
import { ReportComponent } from './report/report.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { ReportStartComponent } from './report/report-start/report-start.component';
import { AuthPageComponent } from './auth-page/auth-page.component';

const appRoutes: Routes = [
  { path: '', redirectTo: '/report', pathMatch: 'full' },
  {
    path: 'report',
    component: ReportComponent,
    children: [
      { path: '', component: ReportStartComponent },
      { path: ':index', component: ReportDetailComponent }
    ]
  },
  {
    path: 'auth',
    component: AuthPageComponent
  },
  {
    path: 'unauthorized',
    component: ErrorPageComponent,
    data: { message: 'You are not logged in!', back: 'AUTH' }
  },
  {
    path: 'not-found',
    component: ErrorPageComponent,
    data: { message: 'Page not found!', back: 'REPORT' }
  },
  { path: '**', redirectTo: '/not-found' }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
