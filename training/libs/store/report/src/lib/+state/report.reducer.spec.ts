import { ReportEntity } from './report.models';
import * as ReportActions from './report.actions';
import { State, initialState, reducer } from './report.reducer';

describe('Report Reducer', () => {
  const createReportEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`
    } as ReportEntity);

  beforeEach(() => {});

  describe('valid Report actions', () => {
    it('loadReportSuccess should return set the list of known Report', () => {
      const report = [
        createReportEntity('PRODUCT-AAA'),
        createReportEntity('PRODUCT-zzz')
      ];
      const action = ReportActions.loadReportSuccess({ report });

      const result: State = reducer(initialState, action);

      expect(result.loaded).toBe(true);
      expect(result.ids.length).toBe(2);
    });
  });

  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result = reducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });
});
