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
          return this.reportService
            .updateReport({
              id: action.id,
              newJYesterday: action.newJYesterday,
              newProblems: action.newProblems,
              newJToday: action.newJToday
            })
            .pipe(
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

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ReportActions.login),
      fetch({
        run: action => {
          return this.http
            .post<{ accessToken: string; expirationDate: number }>(
              '/api/auth/login',
              { username: action.username, password: action.password }
            )
            .pipe(
              map(res => {
                localStorage.setItem('accessToken', res.accessToken);
                localStorage.setItem(
                  'expirationDate',
                  res.expirationDate.toString()
                );
                this.router.navigate(['/report']);
                return ReportActions.loginSuccess({
                  accessToken: res.accessToken,
                  expirationDate: res.expirationDate
                });
              })
            );
        },

        onError: (action, error) => {
          console.error('Error', error);
          alert(`Username or password is incorrect!`);
          return ReportActions.loginFailure({ error });
        }
      })
    )
  );

  logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ReportActions.logout),
      fetch({
        run: action => {
          //FIXME: Maybe user can modify the field's name, so remove localStorage data like this does not really the best way to logout?
          localStorage.removeItem('accessToken');
          localStorage.removeItem('expirationDate');
          this.router.navigate(['/auth']);
        },

        onError: (action, error) => {
          console.error('Error', error);
          alert(`Username or password is incorrect!`);
          return ReportActions.logoutFailure({ error });
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
