import { TestBed, async } from '@angular/core/testing';

import { Observable } from 'rxjs';

import { provideMockActions } from '@ngrx/effects/testing';
import { provideMockStore } from '@ngrx/store/testing';

import { NxModule, DataPersistence } from '@nrwl/angular';
import { hot } from '@nrwl/angular/testing';

import { ReportEffects } from './report.effects';
import * as ReportActions from './report.actions';

describe('ReportEffects', () => {
  let actions: Observable<any>;
  let effects: ReportEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NxModule.forRoot()],
      providers: [
        ReportEffects,
        DataPersistence,
        provideMockActions(() => actions),
        provideMockStore()
      ]
    });

    effects = TestBed.get(ReportEffects);
  });

  describe('loadReport$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: ReportActions.loadReport() });

      const expected = hot('-a-|', {
        a: ReportActions.loadReportSuccess({ report: [] })
      });

      expect(effects.loadReport$).toBeObservable(expected);
    });
  });
});
