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
    newJYesterday: [null, Validators.required],
    newProblems: [null, Validators.required],
    newJToday: [null, Validators.required]
  });
  jobYesterday: string;
  problems: string;
  jobToday: string;
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
        this.jobYesterday = report.jobYesterday;
        this.problems = report.problems;
        this.jobToday = report.jobToday;
      }
    });
  }

  onReportSubmit(): void {
    this.editMode = false;
    this.reportFacade.updateReport({
      jobYesterday: this.jobYesterday,
      problems: this.problems,
      jobToday: this.jobToday
    } as ReportUpdateRequest);
  }
}
