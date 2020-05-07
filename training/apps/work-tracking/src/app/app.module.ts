import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

import { AppComponent } from "./app.component";
import { ReportComponent } from "./report/report.component";
import { ReportListComponent } from "./report/report-list/report-list.component";
import { ReportItemComponent } from "./report/report-list/report-item/report-item.component";
import { ReportDetailComponent } from "./report/report-detail/report-detail.component";
import { ReportCreatorComponent } from "./report/report-creator/report-creator.component";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ErrorPageComponent } from './error-page/error-page.component';
import { AppRoutingModule } from "./app-routing.module";
import { ReportStartComponent } from './report/report-start/report-start.component';

@NgModule({
  declarations: [
    AppComponent,
    ReportComponent,
    ReportListComponent,
    ReportItemComponent,
    ReportDetailComponent,
    ReportCreatorComponent,
    ErrorPageComponent,
    ReportStartComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatButtonModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
}
