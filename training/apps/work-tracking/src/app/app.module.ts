import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import { ReportComponent } from "./report/report.component";
import { ReportListComponent } from "./report/report-list/report-list.component";
import { ReportItemComponent } from "./report/report-list/report-item/report-item.component";
import { ReportDetailComponent } from "./report/report-detail/report-detail.component";
import { ReportCreatorComponent } from "./report/report-creator/report-creator.component";

@NgModule({
  declarations: [
    AppComponent,
    ReportComponent,
    ReportListComponent,
    ReportItemComponent,
    ReportDetailComponent,
    ReportCreatorComponent,
  ],
  imports: [BrowserModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
}
