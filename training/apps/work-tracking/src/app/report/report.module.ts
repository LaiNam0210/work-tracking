import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

import { HeaderComponent } from '@training/header';
import { ReportRoutingModule } from './report-routing.module';
import { ReportComponent } from './report.component';
import { ReportListComponent } from './report-list/report-list.component';
import { ReportDetailComponent } from './report-detail/report-detail.component';
import { ReportItemComponent } from './report-list/report-item/report-item.component';
import { ReportCreatorComponent } from './report-creator/report-creator.component';
import { ReportStartComponent } from './report-start/report-start.component';
import { NotFoundPageComponent } from '../not-found-page/not-found-page.component';
import { UnauthorizedPageComponent } from '../unauthorized-page/unauthorized-page.component';

@NgModule({
  declarations: [
    ReportComponent,
    ReportListComponent,
    ReportDetailComponent,
    ReportItemComponent,
    ReportCreatorComponent,
    ReportStartComponent,
    HeaderComponent,
    NotFoundPageComponent,
    UnauthorizedPageComponent
  ],
  imports: [
    CommonModule,
    ReportRoutingModule,
    MatCardModule,
    MatButtonModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule
  ]
})
export class ReportModule {}
