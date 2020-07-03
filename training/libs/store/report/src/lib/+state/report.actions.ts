import { createAction, props } from '@ngrx/store';
import { Report } from '@training/report';
import { Update } from '@ngrx/entity';

import { ReportEntity } from './report.models';
import { ReportCreateRequest } from '@training/report-interfaces';

export const loadReport = createAction('[Report] Load Report');

export const loadReportSuccess = createAction(
  '[Report] Load Report Success',
  props<{ report: ReportEntity[] }>()
);

export const loadReportFailure = createAction(
  '[Report] Load Report Failure',
  props<{ error: any }>()
);

export const loadReportByIdSuccess = createAction(
  '[Report] Load Report By Index Success',
  props<{ selectedId: number }>()
);

export const loadReportByIdFailure = createAction(
  '[Report] Load Report By Index Failure',
  props<{ error: any }>()
);

export const addReport = createAction(
  '[Report] Add Report',
  props<{ req: ReportCreateRequest }>()
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
  props<{ id: number }>()
);

export const deleteReportSuccess = createAction(
  '[Report] Delete Report Success',
  props<{ deletedId: number }>()
);

export const deleteReportFailure = createAction(
  '[Report] Delete Report Failure',
  props<{ error: any }>()
);

export const updateReport = createAction(
  '[Report] Update report',
  props<{
    id: number;
    jobYesterday: string;
    problems: string;
    jobToday: string;
  }>()
);

export const updateReportSuccess = createAction(
  '[Report] Update Report Success',
  props<{ updatedReport: Update<ReportEntity> }>()
);

export const updateReportFailure = createAction(
  '[Report] Update Report Failure',
  props<{ error: any }>()
);
