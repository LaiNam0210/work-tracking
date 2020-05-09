import { Component, OnInit } from '@angular/core';
import { Report } from '@training/report';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'training-report-detail',
  templateUrl: './report-detail.component.html',
  styleUrls: ['./report-detail.component.scss']
})
export class ReportDetailComponent implements OnInit {
  report$: Observable<Report>;

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit(): void {
    this.report$ = this.route.params.pipe(
      switchMap(
        (params: Params) =>
          this.http.get(`api/report/${params['index']}`) as Observable<Report>
      )
    );
  }

  onDelete(): void {
    //TODO:
  }
}
