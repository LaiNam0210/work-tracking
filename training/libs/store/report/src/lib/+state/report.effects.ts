import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Update } from '@ngrx/entity';
import { Router } from '@angular/router';

import * as ReportActions from './report.actions';
import { Report } from '@training/report';
import { ReportService } from '@training/backend';

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

  loadReportByIndex$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ReportActions.loadReportByIndex),
      fetch({
        run: action => {
          return this.reportService.loadReportByIndex(action.index).pipe(
            map((report: Report) => {
              //FIXME: Is this good to handle error when user enter large index?
              if (!report) {
                return ReportActions.loadReportByIndexFailure({
                  error: 'Cant find chosen report!'
                });
              }
              return ReportActions.loadReportByIndexSuccess({
                selectedId: report.id
              });
            })
          );
        },

        onError: (action, error) => {
          console.error('Error', error);
          return ReportActions.loadReportByIndexFailure({ error });
        }
      })
    )
  );

  addReport$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ReportActions.addReport),
      fetch({
        run: action => {
          return this.reportService.addReport(action.newReport).pipe(
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
          return this.reportService.deleteReport(action.index).pipe(
            map((obj: { deletedId: string }) => {
              alert(`Deleted report with id ${obj.deletedId}`);
              this.router.navigate(['/report']);
              return ReportActions.deleteReportSuccess({
                deletedId: obj.deletedId
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
          return this.reportService.updateReport(action.updatedReport).pipe(
            map(updatedReport => {
              const update: Update<Report> = {
                id: action.updatedReport.id,
                changes: {
                  jobYesterday: action.updatedReport.jobYesterday,
                  problems: action.updatedReport.problems,
                  jobToday: action.updatedReport.jobToday
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
