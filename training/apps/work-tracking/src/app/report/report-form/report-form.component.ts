import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroupDirective, Validators } from '@angular/forms';
import { ReportCreateRequest } from '@training/report-interfaces';
import { Report } from '@training/report';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'training-report-form',
  templateUrl: './report-form.component.html',
  styleUrls: ['./report-form.component.scss']
})
export class ReportFormComponent implements OnInit, OnDestroy {
  @Input() handleFormSubmit: Function;
  @Input() selectedReport$: Observable<Report>;
  @Input() isEditMode: boolean;
  private selectedReportSubscription: Subscription;
  reportForm = this.fb.group({
    jobYesterday: [null, Validators.required],
    problems: [null, Validators.required],
    jobToday: [null, Validators.required]
  });
  @ViewChild(FormGroupDirective) reportNgForm;

  constructor(private fb: FormBuilder) {}

  ngOnDestroy(): void {
    if (!!this.selectedReportSubscription) {
      this.selectedReportSubscription.unsubscribe();
    }
  }

  ngOnInit(): void {
    if (this.isEditMode) {
      this.selectedReportSubscription = this.selectedReport$.subscribe(
        selectedReport => {
          if (!!selectedReport) {
            this.reportForm.setValue({
              jobYesterday: selectedReport.jobYesterday,
              problems: selectedReport.problems,
              jobToday: selectedReport.jobToday
            });
          }
        }
      );
    }
  }

  onReportSubmit() {
    const reportPostRequest = {
      jobYesterday: this.reportForm.value.jobYesterday,
      problems: this.reportForm.value.problems,
      jobToday: this.reportForm.value.jobToday
    } as ReportCreateRequest;
    this.handleFormSubmit(reportPostRequest);
    this.reportNgForm.resetForm();
  }
}
