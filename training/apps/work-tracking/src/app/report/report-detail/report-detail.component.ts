import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';

import { Report } from '@training/report';
import { ReportFacade } from '@training/store/report';
import { ReportUpdateRequest } from '@training/report-interfaces';

@Component({
  selector: 'training-report-detail',
  templateUrl: './report-detail.component.html',
  styleUrls: ['./report-detail.component.scss']
})
export class ReportDetailComponent implements OnInit, OnDestroy {
  report$: Observable<Report>;
  private editReportSubscription: Subscription;
  editMode = false;
  reportForm = this.fb.group({
    jobYesterday: this.fb.control(null, Validators.required),
    problems: this.fb.control(null, Validators.required),
    jobToday: this.fb.control(null, Validators.required)
  });
  error$ = this.reportFacade.error$;

  constructor(private reportFacade: ReportFacade, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.report$ = this.reportFacade.selectedReport$;
  }

  onDelete(): void {
    this.reportFacade.deleteSelectedReport();
  }

  onEdit(): void {
    this.editMode = true;
    this.editReportSubscription = this.report$.subscribe(report => {
      if (!!report) {
        this.reportForm.setValue({
          jobYesterday: report.jobYesterday,
          problems: report.problems,
          jobToday: report.jobToday
        });
      }
    });
  }

  onReportSubmit(): void {
    this.editMode = false;
    this.reportFacade.updateReport(
      this.reportForm.value as ReportUpdateRequest
    );
  }

  ngOnDestroy() {
    this.editReportSubscription.unsubscribe();
  }
}
