import { createReducer, on, Action } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import * as ReportActions from './report.actions';
import { ReportEntity } from './report.models';

export const REPORT_FEATURE_KEY = 'report';

export interface State extends EntityState<ReportEntity> {
  selectedId?: string | number; // which Report record has been selected
  loaded: boolean; // has the Report list been loaded
  error?: string | null; // last none error (if any)
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
    reportAdapter.addAll(report, { ...state, loaded: true })
  ),
  on(ReportActions.loadReportFailure, (state, { error }) => ({
    ...state,
    error
  }))
);

export function reducer(state: State | undefined, action: Action) {
  return reportReducer(state, action);
}
