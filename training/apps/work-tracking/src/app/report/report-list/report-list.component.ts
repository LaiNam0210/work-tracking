import { Component, OnInit } from '@angular/core';
import { Report } from '@training/report';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'training-report-list',
  templateUrl: './report-list.component.html',
  styleUrls: ['./report-list.component.scss']
})
export class ReportListComponent implements OnInit {
  reports: Report[] = [];
  noReportCreated = false;
  errorMessage = '';

  constructor(private http: HttpClient) {
    this.fetch();
  }

  fetch() {
    this.http.get<Report[]>('/api/report').subscribe(
      (reports: Report[]) => {
        this.reports = reports;
        if (reports.length === 0) {
          this.noReportCreated = true;
        }
      },
      error => (this.errorMessage = error.message)
    );
  }

  ngOnInit(): void {}
}
