import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportStartComponent } from './report-start.component';

describe('ReportStartComponent', () => {
  let component: ReportStartComponent;
  let fixture: ComponentFixture<ReportStartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ReportStartComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportStartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
