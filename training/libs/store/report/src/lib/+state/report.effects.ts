import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';

import * as fromReport from './report.reducer';
import * as ReportActions from './report.actions';
import { Report } from '@training/report';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

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

  constructor(private actions$: Actions, private http: HttpClient) {}
}
