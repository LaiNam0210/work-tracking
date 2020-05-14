import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Params, Router } from '@angular/router';
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

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private reportFacade: ReportFacade
  ) {}

  ngOnInit(): void {
    this.report$ = this.route.params.pipe(
      switchMap(
        (params: Params) =>
          this.http.get(`api/report/${params['index']}`) as Observable<Report>
      )
    );
  }

  onDelete(): void {
    let index: number;
    this.route.params.subscribe(value => (index = +value['index']));
    this.reportFacade.deleteReport(index);
    this.router.navigate(['/report']);
  }
}
