import { Injectable } from '@angular/core';

import { select, Store, Action } from '@ngrx/store';

import * as fromReport from './report.reducer';
import * as ReportSelectors from './report.selectors';
import { loadReport } from './report.actions';

@Injectable()
export class ReportFacade {
  loaded$ = this.store.pipe(select(ReportSelectors.getReportLoaded));
  allReport$ = this.store.pipe(select(ReportSelectors.getAllReport));
  selectedReport$ = this.store.pipe(select(ReportSelectors.getSelected));

  constructor(private store: Store<fromReport.ReportPartialState>) {}

  loadReports() {
    this.dispatch(loadReport());
  }

  dispatch(action: Action) {
    this.store.dispatch(action);
  }
}
