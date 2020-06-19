import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';

import * as AuthActions from './auth.actions';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ReportService } from '@training/backend';

@Injectable()
export class AuthEffects {
  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login),
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
                return AuthActions.loginSuccess({
                  accessToken: res.accessToken,
                  expirationDate: res.expirationDate
                });
              })
            );
        },

        onError: (action, error) => {
          console.error('Error', error);
          alert(`Username or password is incorrect!`);
          return AuthActions.loginFailure({ error });
        }
      })
    )
  );

  logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.logout),
      fetch({
        run: action => {
          localStorage.removeItem('accessToken');
          localStorage.removeItem('expirationDate');
          this.router.navigate(['/auth']);
        },

        onError: (action, error) => {
          console.error('Error', error);
          alert(`Username or password is incorrect!`);
          return AuthActions.logoutFailure({ error });
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
