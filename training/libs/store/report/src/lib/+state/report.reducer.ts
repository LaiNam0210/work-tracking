import { createReducer, on, Action } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import * as ReportActions from './report.actions';
import { ReportEntity } from './report.models';
import { HttpErrorResponse } from '@angular/common/http';

export const REPORT_FEATURE_KEY = 'report';

export interface State extends EntityState<ReportEntity> {
  selectedId?: string; // which Report record has been selected
  loaded: boolean; // has the Report list been loaded
  error?: string | null | HttpErrorResponse; // last none error (if any)
}

export interface ReportPartialState {
  readonly [REPORT_FEATURE_KEY]: State;
}

export const reportAdapter: EntityAdapter<ReportEntity> = createEntityAdapter<
  ReportEntity
>();

export const initialState: State = reportAdapter.getInitialState({
  // set initial required properties
  loaded: false
});

const reportReducer = createReducer(
  initialState,
  /* LOAD */
  on(ReportActions.loadReport, state => ({
    ...state,
    loaded: false,
    error: null
  })),
  on(ReportActions.loadReportSuccess, (state, { report }) =>
    reportAdapter.addMany(report, { ...state, loaded: true })
  ),
  on(ReportActions.loadReportFailure, (state, { error }) => ({
    ...state,
    error
  })),

  /* LOAD BY INDEX */
  on(ReportActions.loadReportByIndex, (state, { index }) => ({
    ...state
  })),
  on(ReportActions.loadReportByIndexSuccess, (state, { selectedId }) => ({
    ...state,
    selectedId: selectedId
  })),
  on(ReportActions.loadReportByIndexFailure, (state, { error }) => ({
    ...state,
    error
  })),

  /* ADD REPORT */
  on(ReportActions.addReport, (state, { newReport }) => ({ ...state })),
  on(ReportActions.addReportSuccess, (state, { addedReport }) =>
    reportAdapter.addOne(addedReport, { ...state })
  ),
  on(ReportActions.addReportFailure, (state, { error }) => ({
    ...state,
    error
  })),

  /* DELETE REPORT */
  on(ReportActions.deleteReport, (state, { index }) => ({ ...state })),
  on(ReportActions.deleteReportSuccess, (state, { deletedId }) =>
    reportAdapter.removeOne(deletedId, { ...state })
  ),
  on(ReportActions.deleteReportFailure, (state, { error }) => ({
    ...state,
    error
  })),

  /* UPDATE REPORT */
  on(
    ReportActions.updateReport,
    (state, { id, newJYesterday, newProblems, newJToday }) => ({
      ...state,
      selectedId: id
    })
  ),
  on(ReportActions.updateReportSuccess, (state, { updatedReport }) =>
    reportAdapter.updateOne(updatedReport, { ...state })
  ),
  on(ReportActions.deleteReportFailure, (state, { error }) => ({
    ...state,
    error
  })),

  /* LOGIN */
  on(ReportActions.login, (state, { username, password }) => ({ ...state })),
  on(ReportActions.loginSuccess, (state, { accessToken }) => ({ ...state })),
  on(ReportActions.loginFailure, (state, { error }) => ({
    ...state,
    error
  }))
);

export function reducer(state: State | undefined, action: Action) {
  return reportReducer(state, action);
}
