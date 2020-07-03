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
  jobYesterday: string;
  problems: string;
  jobToday: string;
  error$ = this.reportFacade.error$;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private reportFacade: ReportFacade,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.report$ = this.reportFacade.selectedReport$;
  }

  onDelete(): void {
    let id: number;
    this.route.params.subscribe(params => (id = +params['id']));
    this.reportFacade.deleteReport(id);
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
      let id: number;
      this.route.params.subscribe(params => (id = +params['id']));
      this.reportFacade.updateReport(
        id,
        this.jobYesterday,
        this.problems,
        this.jobToday
      );
    });
    subs.unsubscribe();
  }
}
