import { createAction, props } from '@ngrx/store';
import { ReportEntity } from './report.models';
import { Report } from '@training/report';

export const loadReport = createAction('[Report] Load Report');

export const loadReportSuccess = createAction(
  '[Report] Load Report Success',
  props<{ report: ReportEntity[] }>()
);

export const loadReportFailure = createAction(
  '[Report] Load Report Failure',
  props<{ error: any }>()
);

export const loadReportId = createAction(
  '[Report] Load Report Id',
  props<{ id: string }>()
);

export const addReport = createAction(
  '[Report] Add Report',
  props<{ newReport: Report }>()
);

export const addReportSuccess = createAction(
  '[Report] Add Report Success',
  props<{ addedReport: Report }>()
);

export const addReportFailure = createAction(
  '[Report] Add Report Failure',
  props<{ error: any }>()
);

export const deleteReport = createAction(
  '[Report] Delete Report',
  props<{ index: number }>()
);

export const deleteReportSuccess = createAction(
  '[Report] Delete Report Success',
  props<{ deletedId: string }>()
);

export const deleteReportFailure = createAction(
  '[Report] Delete Report Failure',
  props<{ error: any }>()
);
