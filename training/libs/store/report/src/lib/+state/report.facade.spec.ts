import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { readFirst } from '@nrwl/angular/testing';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule, Store } from '@ngrx/store';

import { NxModule } from '@nrwl/angular';

import { ReportEntity } from './report.models';
import { ReportEffects } from './report.effects';
import { ReportFacade } from './report.facade';

import * as ReportSelectors from './report.selectors';
import * as ReportActions from './report.actions';
import {
  REPORT_FEATURE_KEY,
  State,
  initialState,
  reducer
} from './report.reducer';

interface TestSchema {
  report: State;
}

describe('ReportFacade', () => {
  let facade: ReportFacade;
  let store: Store<TestSchema>;
  const createReportEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`
    } as ReportEntity);

  beforeEach(() => {});

  describe('used in NgModule', () => {
    beforeEach(() => {
      @NgModule({
        imports: [
          StoreModule.forFeature(REPORT_FEATURE_KEY, reducer),
          EffectsModule.forFeature([ReportEffects])
        ],
        providers: [ReportFacade]
      })
      class CustomFeatureModule {}

      @NgModule({
        imports: [
          NxModule.forRoot(),
          StoreModule.forRoot({}),
          EffectsModule.forRoot([]),
          CustomFeatureModule
        ]
      })
      class RootModule {}
      TestBed.configureTestingModule({ imports: [RootModule] });

      store = TestBed.get(Store);
      facade = TestBed.get(ReportFacade);
    });

    /**
     * The initially generated facade::loadAll() returns empty array
     */
    it('loadAll() should return empty list with loaded == true', async done => {
      try {
        let list = await readFirst(facade.allReport$);
        let isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(false);

        facade.dispatch(ReportActions.loadReport());

        list = await readFirst(facade.allReport$);
        isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(true);

        done();
      } catch (err) {
        done.fail(err);
      }
    });

    /**
     * Use `loadReportSuccess` to manually update list
     */
    it('allReport$ should return the loaded list; and loaded flag == true', async done => {
      try {
        let list = await readFirst(facade.allReport$);
        let isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(false);

        facade.dispatch(
          ReportActions.loadReportSuccess({
            report: [createReportEntity('AAA'), createReportEntity('BBB')]
          })
        );

        list = await readFirst(facade.allReport$);
        isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(2);
        expect(isLoaded).toBe(true);

        done();
      } catch (err) {
        done.fail(err);
      }
    });
  });
});
