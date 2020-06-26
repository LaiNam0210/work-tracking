import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

import { Report } from '@training/report';
import { ReportFacade } from '@training/store/report';

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
  id: string;
  jobYesterday: string;
  problems: string;
  jobToday: string;
  error$ = this.reportFacade.error$;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private reportFacade: ReportFacade,
    private fb: FormBuilder
  ) {
    this.route.params.subscribe(params =>
      this.reportFacade.loadReportByIndex(+params['index'])
    );
  }

  ngOnInit(): void {
    this.report$ = this.reportFacade.selectedReport$;
  }

  onDelete(): void {
    let index: number;
    this.route.params.subscribe(value => (index = +value['index']));
    this.reportFacade.deleteReport(index);
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
    const subs = this.report$.subscribe((report: Report) => {
      const updatedReport = { ...report };
      updatedReport.jobYesterday = this.jobYesterday;
      updatedReport.problems = this.problems;
      updatedReport.jobToday = this.jobToday;
      this.reportFacade.updateReport(updatedReport);
    });
    subs.unsubscribe();
  }
}
