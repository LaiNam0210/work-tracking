import { createAction, props } from '@ngrx/store';
import { Report } from '@training/report';
import { Update } from '@ngrx/entity';

import { ReportEntity } from './report.models';
import {
  ReportCreateRequest,
  ReportUpdateRequest
} from '@training/report-interfaces';

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

export const deleteSelectedReport = createAction(
  '[Report] Delete Selected Report'
);

export const deleteSelectedReportSuccess = createAction(
  '[Report] Delete Selected Report Success',
  props<{ deletedId: number }>()
);

export const deleteSelectedReportFailure = createAction(
  '[Report] Delete Selected Report Failure',
  props<{ error: any }>()
);

export const updateSelectedReport = createAction(
  '[Report] Update Selected Report',
  props<{ req: ReportUpdateRequest }>()
);

export const updateSelectedReportSuccess = createAction(
  '[Report] Update Selected Report Success',
  props<{ updatedReport: Update<ReportEntity> }>()
);

export const updateSelectedReportFailure = createAction(
  '[Report] Update Selected Report Failure',
  props<{ error: any }>()
);
