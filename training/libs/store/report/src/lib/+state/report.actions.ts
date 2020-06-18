import { createAction, props } from '@ngrx/store';
import { Report } from '@training/report';
import { Update } from '@ngrx/entity';

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

export const loadReportId = createAction(
  '[Report] Load Report Id',
  props<{ id: string }>()
);

export const loadReportByIndex = createAction(
  '[Report] Load Report By Index',
  props<{ index: number }>()
);

export const loadReportByIndexSuccess = createAction(
  '[Report] Load Report By Index Success',
  props<{ selectedId: string }>()
);

export const loadReportByIndexFailure = createAction(
  '[Report] Load Report By Index Failure',
  props<{ error: any }>()
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

export const updateReport = createAction(
  '[Report] Update report',
  props<{ updatedReport: Report }>()
);

export const updateReportSuccess = createAction(
  '[Report] Update Report Success',
  props<{ updatedReport: Update<ReportEntity> }>()
);

export const updateReportFailure = createAction(
  '[Report] Update Report Failure',
  props<{ error: any }>()
);

export const login = createAction(
  '[Auth] Login',
  props<{ username: string; password: string }>()
);

export const loginSuccess = createAction(
  '[Auth] Login Success',
  props<{ accessToken: string; expirationDate: number }>()
);

export const loginFailure = createAction(
  '[Auth] Login Failure',
  props<{ error: any }>()
);

export const logout = createAction('[Auth] Logout');

export const logoutFailure = createAction(
  '[Auth] Logout Failure',
  props<{ error: any }>()
);
