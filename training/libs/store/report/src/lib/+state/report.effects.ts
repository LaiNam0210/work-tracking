import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType, Effect } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';
import { HttpClient } from '@angular/common/http';
import { catchError, filter, map } from 'rxjs/operators';
import { Update } from '@ngrx/entity';
import { Router } from '@angular/router';

import * as ReportActions from './report.actions';
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

  deleteReport$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ReportActions.deleteReport),
      fetch({
        run: action => {
          return this.reportService.deleteReport(action.id).pipe(
            map(deletedId => {
              alert(`Deleted report with id ${deletedId}`);
              this.router.navigate(['/report']);
              return ReportActions.deleteReportSuccess({
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
    )
  );

  updateReport$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ReportActions.updateReport),
      fetch({
        run: action => {
          return this.reportService
            .updateReport(
              action.id,
              action.jobYesterday,
              action.problems,
              action.jobToday
            )
            .pipe(
              map(updatedReport => {
                const update: Update<Report> = {
                  id: action.id,
                  changes: {
                    jobYesterday: action.jobYesterday,
                    problems: action.problems,
                    jobToday: action.jobToday
                  }
                };
                alert(`Updated report with id ${updatedReport.id}`);
                this.router.navigate(['/report']);
                return ReportActions.updateReportSuccess({
                  updatedReport: update
                });
              })
            );
        },

        onError: (action, error) => {
          console.error('Error from effect: ', error);
          return ReportActions.updateReportFailure({ error });
        }
      })
    )
  );

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private router: Router,
    private reportService: ReportService
  ) {}
}
