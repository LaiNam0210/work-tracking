import { createFeatureSelector, createSelector } from '@ngrx/store';
import { compareAsc } from 'date-fns';
import {
  REPORT_FEATURE_KEY,
  State,
  ReportPartialState,
  reportAdapter
} from './report.reducer';

// Lookup the 'Report' feature state managed by NgRx
export const getReportState = createFeatureSelector<ReportPartialState, State>(
  REPORT_FEATURE_KEY
);

const { selectAll, selectEntities } = reportAdapter.getSelectors();

export const getReportLoaded = createSelector(
  getReportState,
  (state: State) => state.loaded
);

export const getReportError = createSelector(
  getReportState,
  (state: State) => state.error
);

export const getAllReport = createSelector(getReportState, (state: State) => {
  return selectAll(state).sort(function(a, b) {
    return compareAsc(new Date(b.timeCreated), new Date(a.timeCreated));
  });
});

export const getReportEntities = createSelector(
  getReportState,
  (state: State) => selectEntities(state)
);

export const getSelectedId = createSelector(
  getReportState,
  (state: State) => state.selectedId
);

export const getSelected = createSelector(
  getReportEntities,
  getSelectedId,
  (entities, selectedId) => selectedId && entities[selectedId]
);
