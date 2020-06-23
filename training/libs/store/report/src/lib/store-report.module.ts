import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromReport from './+state/report.reducer';
import { ReportEffects } from './+state/report.effects';
import { ReportFacade } from './+state/report.facade';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(fromReport.REPORT_FEATURE_KEY, fromReport.reducer),
    EffectsModule.forFeature([ReportEffects])
  ],
  providers: [ReportFacade]
})
export class StoreReportModule {}
