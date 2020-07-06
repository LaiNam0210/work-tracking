import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

import { Report } from '@training/report';
import { ReportFacade } from '@training/store/report';
import { ReportUpdateRequest } from '@training/report-interfaces';

@Component({
  selector: 'training-report-detail',
  templateUrl: './report-detail.component.html',
  styleUrls: ['./report-detail.component.scss']
})
export class ReportDetailComponent implements OnInit {
  report$: Observable<Report>;
  editMode = false;
  reportForm = this.fb.group({
    jobYesterday: [null, Validators.required],
    problems: [null, Validators.required],
    jobToday: [null, Validators.required]
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
    this.report$.subscribe(report => {
      if (!!report) {
        this.reportForm.controls['jobYesterday'].setValue(report.jobYesterday);
        this.reportForm.controls['problems'].setValue(report.problems);
        this.reportForm.controls['jobToday'].setValue(report.jobToday);
      }
    });
  }

  onReportSubmit(): void {
    this.editMode = false;
    this.reportFacade.updateReport({
      jobYesterday: this.reportForm.controls['jobYesterday'].value.toString(),
      problems: this.reportForm.controls['problems'].value.toString(),
      jobToday: this.reportForm.controls['jobToday'].value.toString()
    } as ReportUpdateRequest);
  }
}
