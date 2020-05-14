import { Injectable } from '@angular/core';

import { select, Store, Action } from '@ngrx/store';

import * as fromReport from './report.reducer';
import * as ReportSelectors from './report.selectors';
import { addReport, loadReport, deleteReport } from './report.actions';
import { Report } from '@training/report';

@Injectable()
export class ReportFacade {
  loaded$ = this.store.pipe(select(ReportSelectors.getReportLoaded));
  allReport$ = this.store.pipe(select(ReportSelectors.getAllReport));
  selectedReport$ = this.store.pipe(select(ReportSelectors.getSelected));

  constructor(private store: Store<fromReport.ReportPartialState>) {}

  loadReports() {
    this.dispatch(loadReport());
  }

  addReport(newReport: Report) {
    this.dispatch(addReport({ newReport }));
  }

  deleteReport(index: number) {
    this.dispatch(deleteReport({ index }));
  }

  dispatch(action: Action) {
    this.store.dispatch(action);
  }
}
