import { async, TestBed } from '@angular/core/testing';
import { StoreReportModule } from './store-report.module';

describe('StoreReportModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [StoreReportModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(StoreReportModule).toBeDefined();
  });
});
