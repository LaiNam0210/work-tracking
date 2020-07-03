import { createReducer, on, Action } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import * as ReportActions from './report.actions';
import { ReportEntity } from './report.models';
import { HttpErrorResponse } from '@angular/common/http';

export const REPORT_FEATURE_KEY = 'report';

export interface State extends EntityState<ReportEntity> {
  selectedId?: number; // which Report record has been selected
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

  on(ReportActions.loadReportByIdSuccess, (state, { selectedId }) => ({
    ...state,
    selectedId: selectedId
  })),
  on(ReportActions.loadReportByIdFailure, (state, { error }) => ({
    ...state,
    error
  })),

  on(ReportActions.addReport, (state, { req }) => ({ ...state })),
  on(ReportActions.addReportSuccess, (state, { addedReport }) =>
    reportAdapter.addOne(addedReport, { ...state })
  ),
  on(ReportActions.addReportFailure, (state, { error }) => ({
    ...state,
    error
  })),

  on(ReportActions.deleteSelectedReport, state => ({ ...state })),
  on(ReportActions.deleteSelectedReportSuccess, (state, { deletedId }) =>
    reportAdapter.removeOne(deletedId, { ...state })
  ),
  on(ReportActions.deleteSelectedReportFailure, (state, { error }) => ({
    ...state,
    error
  })),

  on(
    ReportActions.updateSelectedReport,
    (state, { jobYesterday, problems, jobToday }) => ({
      ...state
    })
  ),
  on(ReportActions.updateSelectedReportSuccess, (state, { updatedReport }) =>
    reportAdapter.updateOne(updatedReport, { ...state })
  ),
  on(ReportActions.deleteSelectedReportFailure, (state, { error }) => ({
    ...state,
    error
  }))
);

export function reducer(state: State | undefined, action: Action) {
  return reportReducer(state, action);
}
