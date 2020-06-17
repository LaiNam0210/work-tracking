import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReportDetailComponent } from './report/report-detail/report-detail.component';
import { ReportComponent } from './report/report.component';
import { ReportStartComponent } from './report/report-start/report-start.component';
import { AuthPageComponent } from './auth-page/auth-page.component';
import { UnauthorizedPageComponent } from './unauthorized-page/unauthorized-page.component';
import { NotFoundPageComponent } from './not-found-page/not-found-page.component';

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
    component: UnauthorizedPageComponent
  },
  {
    path: 'not-found',
    component: NotFoundPageComponent
  },
  { path: '**', redirectTo: '/not-found' }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
