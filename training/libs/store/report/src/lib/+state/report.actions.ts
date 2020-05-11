import { createAction, props } from '@ngrx/store';
import { ReportEntity } from './report.models';

export const loadReport = createAction('[Report] Load Report');

export const loadReportSuccess = createAction(
  '[Report] Load Report Success',
  props<{ report: ReportEntity[] }>()
);

export const loadReportFailure = createAction(
  '[Report] Load Report Failure',
  props<{ error: any }>()
);
