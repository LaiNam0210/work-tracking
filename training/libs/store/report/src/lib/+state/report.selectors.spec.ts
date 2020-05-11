import { ReportEntity } from './report.models';
import { State, reportAdapter, initialState } from './report.reducer';
import * as ReportSelectors from './report.selectors';

describe('Report Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getReportId = it => it['id'];
  const createReportEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`
    } as ReportEntity);

  let state;

  beforeEach(() => {
    state = {
      report: reportAdapter.addAll(
        [
          createReportEntity('PRODUCT-AAA'),
          createReportEntity('PRODUCT-BBB'),
          createReportEntity('PRODUCT-CCC')
        ],
        {
          ...initialState,
          selectedId: 'PRODUCT-BBB',
          error: ERROR_MSG,
          loaded: true
        }
      )
    };
  });

  describe('Report Selectors', () => {
    it('getAllReport() should return the list of Report', () => {
      const results = ReportSelectors.getAllReport(state);
      const selId = getReportId(results[1]);

      expect(results.length).toBe(3);
      expect(selId).toBe('PRODUCT-BBB');
    });

    it('getSelected() should return the selected Entity', () => {
      const result = ReportSelectors.getSelected(state);
      const selId = getReportId(result);

      expect(selId).toBe('PRODUCT-BBB');
    });

    it("getReportLoaded() should return the current 'loaded' status", () => {
      const result = ReportSelectors.getReportLoaded(state);

      expect(result).toBe(true);
    });

    it("getReportError() should return the current 'error' state", () => {
      const result = ReportSelectors.getReportError(state);

      expect(result).toBe(ERROR_MSG);
    });
  });
});
