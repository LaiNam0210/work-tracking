import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportDetailRoutingModule } from './report-detail-routing.module';
import { ReportDetailComponent } from './report-detail.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  imports: [
    CommonModule,
    ReportDetailRoutingModule,
    CommonModule,
    MatCardModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule
  ],
  declarations: [ReportDetailComponent]
})
export class ReportDetailModule {}
