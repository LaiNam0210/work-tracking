import { Injectable } from '@angular/core';
import { Actions, createEffect, Effect, ofType } from '@ngrx/effects';
import { DataPersistence, fetch } from '@nrwl/angular';
import { HttpClient } from '@angular/common/http';
import { catchError, filter, map } from 'rxjs/operators';
import { Update } from '@ngrx/entity';
import { Router } from '@angular/router';

import * as ReportActions from './report.actions';
import * as fromReport from './report.reducer';
import { REPORT_FEATURE_KEY } from './report.reducer';
import { Report } from '@training/report';
import { ReportService } from '@training/backend';
import { ROUTER_NAVIGATION, RouterNavigationAction } from '@ngrx/router-store';
import { RouterStateUrl } from '@training/store/router';
import { of } from 'rxjs';

@Injectable()
export class ReportEffects {
  loadReport$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ReportActions.loadReport),
      fetch({
        run: action => {
          return this.reportService.loadReports().pipe(
            map((reports: Report[]) => {
              return ReportActions.loadReportSuccess({ report: reports });
            })
          );
        },

        onError: (action, error) => {
          console.error('Error', error);
          return ReportActions.loadReportFailure({ error });
        }
      })
    )
  );

  @Effect()
  loadReportById$ = this.actions$.pipe(
    ofType(ROUTER_NAVIGATION),
    map((r: RouterNavigationAction<RouterStateUrl>) => {
      return { selectedId: r.payload.routerState.params['id'] };
    }),
    filter(({ selectedId }) => !!selectedId),
    map(({ selectedId }) => {
      return ReportActions.loadReportByIdSuccess({ selectedId });
    }),
    catchError(error => of(ReportActions.loadReportByIdFailure({ error })))
  );

  addReport$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ReportActions.addReport),
      fetch({
        run: action => {
          return this.reportService.addReport(action.req).pipe(
            map((addedReport: Report) => {
              alert(`Added report with id ${addedReport.id}`);
              this.router.navigate(['/report']);
              return ReportActions.addReportSuccess({
                addedReport: addedReport
              });
            })
          );
        },

        onError: (action, error) => {
          console.error('Error', error);
          return ReportActions.addReportFailure({ error });
        }
      })
    )
  );

  deleteSelectedReport$ = createEffect(() =>
    this.dataPersistence.fetch(ReportActions.deleteSelectedReport, {
      run: (
        action: ReturnType<typeof ReportActions.deleteSelectedReport>,
        state: fromReport.ReportPartialState
      ) => {
        return this.reportService
          .deleteReport(state[REPORT_FEATURE_KEY].selectedId)
          .pipe(
            map(deletedId => {
              alert(`Deleted report with id ${deletedId}`);
              this.router.navigate(['/report']);
              return ReportActions.deleteSelectedReportSuccess({
                deletedId: deletedId
              });
            })
          );
      },

      onError: (action, error) => {
        console.error('Error from effect: ', error);
        return ReportActions.addReportFailure({ error });
      }
    })
  );

  updateSelectedReport$ = createEffect(() =>
    this.dataPersistence.fetch(ReportActions.updateSelectedReport, {
      run: (
        action: ReturnType<typeof ReportActions.updateSelectedReport>,
        state: fromReport.ReportPartialState
      ) => {
        return this.reportService
          .updateReport(state[REPORT_FEATURE_KEY].selectedId, action.req)
          .pipe(
            map(updatedReport => {
              const id = state[REPORT_FEATURE_KEY].selectedId;
              const update: Update<Report> = {
                id,
                changes: {
                  jobYesterday: action.req.jobYesterday,
                  problems: action.req.problems,
                  jobToday: action.req.jobToday
                }
              };
              alert(`Updated report with id ${id}`);
              this.router.navigate(['/report']);
              return ReportActions.updateSelectedReportSuccess({
                updatedReport: update
              });
            })
          );
      },

      onError: (action, error) => {
        console.error('Error from effect: ', error);
        return ReportActions.updateSelectedReportFailure({ error });
      }
    })
  );

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private router: Router,
    private reportService: ReportService,
    private dataPersistence: DataPersistence<fromReport.ReportPartialState>
  ) {}
}
