import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ReportDetailComponent } from "./report/report-detail/report-detail.component";
import { ReportComponent } from "./report/report.component";
import { ErrorPageComponent } from "./error-page/error-page.component";
import { ReportStartComponent } from "./report/report-start/report-start.component";

const appRoutes: Routes = [
  { path: '', redirectTo:'/report', pathMatch: 'full'},
  { path: 'report', component: ReportComponent, children: [
      { path: '', component: ReportStartComponent},
      { path: ':index', component: ReportDetailComponent}
    ]},
  {
    path: 'not-found',
    component: ErrorPageComponent,
    data: { message: 'Page not found!' },
  },
  { path: '**', redirectTo: '/not-found' }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule{}
