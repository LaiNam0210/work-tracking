import { Injectable } from '@angular/core';

import { select, Store, Action } from '@ngrx/store';

import * as fromReport from './report.reducer';
import * as ReportSelectors from './report.selectors';
import {
  addReport,
  loadReport,
  deleteSelectedReport,
  updateSelectedReport
} from './report.actions';
import {
  ReportCreateRequest,
  ReportUpdateRequest
} from '@training/report-interfaces';

@Injectable()
export class ReportFacade {
  loaded$ = this.store.pipe(select(ReportSelectors.getReportLoaded));
  allReport$ = this.store.pipe(select(ReportSelectors.getAllReport));
  selectedReport$ = this.store.pipe(select(ReportSelectors.getSelected));
  error$ = this.store.pipe(select(ReportSelectors.getReportError));

  constructor(private store: Store<fromReport.ReportPartialState>) {}

  loadReports() {
    this.dispatch(loadReport());
  }

  addReport(req: ReportCreateRequest) {
    this.dispatch(addReport({ req }));
  }

  deleteSelectedReport() {
    this.dispatch(deleteSelectedReport({}));
  }

  updateReport(req: ReportUpdateRequest) {
    this.dispatch(updateSelectedReport({ req }));
  }

  dispatch(action: Action) {
    this.store.dispatch(action);
  }
}
