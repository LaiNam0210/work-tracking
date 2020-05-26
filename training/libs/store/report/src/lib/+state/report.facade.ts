import { Injectable } from '@angular/core';

import { select, Store, Action } from '@ngrx/store';

import * as fromReport from './report.reducer';
import * as ReportSelectors from './report.selectors';
import {
  addReport,
  loadReport,
  loadReportByIndex,
  deleteReport,
  updateReport,
  login
} from './report.actions';
import { Report } from '@training/report';

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

  loadReportByIndex(index: number) {
    this.dispatch(loadReportByIndex({ index }));
  }

  addReport(newReport: Report) {
    this.dispatch(addReport({ newReport }));
  }

  deleteReport(index: number) {
    this.dispatch(deleteReport({ index }));
  }

  updateReport(
    id: string,
    newJYesterday: string,
    newProblems: string,
    newJToday: string
  ) {
    this.dispatch(updateReport({ id, newJYesterday, newProblems, newJToday }));
  }

  login(username: string, password: string) {
    this.dispatch(login({ username, password }));
  }

  dispatch(action: Action) {
    this.store.dispatch(action);
  }
}
