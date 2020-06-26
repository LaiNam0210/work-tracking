import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReportComponent } from './report.component';
import { ReportStartComponent } from './report-start/report-start.component';
import { ReportDetailComponent } from './report-detail/report-detail.component';
import { UnauthorizedPageComponent } from '../unauthorized-page/unauthorized-page.component';

const routes: Routes = [
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
    loadChildren: () =>
      import('../auth-page/auth-page.module').then(m => m.AuthPageModule)
  },
  {
    path: 'unauthorized',
    component: UnauthorizedPageComponent
  },
  {
    path: 'not-found',
    loadChildren: () =>
      import('../not-found-page/not-found-page.module').then(
        m => m.NotFoundPageModule
      )
  },
  { path: '**', redirectTo: '/not-found' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportRoutingModule {}
