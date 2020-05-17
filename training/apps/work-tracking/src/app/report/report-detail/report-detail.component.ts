import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

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

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private reportFacade: ReportFacade,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.report$ = this.route.params.pipe(
      switchMap(
        (params: Params) =>
          this.http.get(`api/report/${params['index']}`) as Observable<Report>
      )
    );

    this.report$.subscribe(report => {
      this.id = report.id;
      this.jobYesterday = report.jobYesterday;
      this.problems = report.problems;
      this.jobToday = report.jobToday;
    });
  }

  onDelete(): void {
    let index: number;
    this.route.params.subscribe(value => (index = +value['index']));
    this.reportFacade.deleteReport(index);
    this.router.navigate(['/report']);
  }

  onEdit(): void {
    this.editMode = true;
  }

  onReportSubmit(): void {
    this.editMode = false;
    this.reportFacade.updateReport(
      this.id,
      this.jobYesterday,
      this.problems,
      this.jobToday
    );
    this.router.navigate(['/report']);
  }
}
