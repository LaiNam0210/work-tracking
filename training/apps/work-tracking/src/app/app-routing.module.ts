import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const appRoutes: Routes = [
  {
    path: '',
    redirectTo: '/report',
    pathMatch: 'full'
  },
  {
    path: 'report',
    loadChildren: () =>
      import('./report/report.module').then(m => m.ReportModule)
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./auth-page/auth-page.module').then(m => m.AuthPageModule)
  },
  {
    path: 'unauthorized',
    loadChildren: () =>
      import('./unauthorized-page/unauthorized-page.module').then(
        m => m.UnauthorizedPageModule
      )
  },
  {
    path: 'not-found',
    loadChildren: () =>
      import('./not-found-page/not-found-page.module').then(
        m => m.NotFoundPageModule
      )
  },
  { path: '**', redirectTo: '/not-found' }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
