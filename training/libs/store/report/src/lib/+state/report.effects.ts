import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Update } from '@ngrx/entity';

import * as fromReport from './report.reducer';
import * as ReportActions from './report.actions';
import { Report } from '@training/report';
import { Router } from '@angular/router';

@Injectable()
export class ReportEffects {
  loadReport$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ReportActions.loadReport),
      fetch({
        run: action => {
          // Your custom service 'load' logic goes here. For now just return a success action...
          return this.http.get<Report[]>('/api/report').pipe(
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

  addReport$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ReportActions.addReport),
      fetch({
        run: action => {
          // Your custom service 'load' logic goes here. For now just return a success action...
          return this.http
            .post<Report>('/api/add_report', action.newReport)
            .pipe(
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
          const url = `/api/delete_report/${action.index}`;
          return this.http.delete<{ deletedId: string }>(url).pipe(
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
          const url = `/api/update_report/`;
          const body = {
            id: action.id,
            newJYesterday: action.newJYesterday,
            newProblems: action.newProblems,
            newJToday: action.newJToday
          };
          return this.http.put<Report>(url, body).pipe(
            map(updatedReport => {
              const update: Update<Report> = {
                id: action.id,
                changes: {
                  jobYesterday: action.newJYesterday,
                  problems: action.newProblems,
                  jobToday: action.newJToday
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
    private router: Router
  ) {}
}
