import { Component, OnInit } from '@angular/core';
import { Report } from '@training/report';
import { Observable } from 'rxjs';
import { ReportEntity, ReportFacade } from '@training/store/report';

@Component({
  selector: 'training-report-list',
  templateUrl: './report-list.component.html',
  styleUrls: ['./report-list.component.scss']
})
export class ReportListComponent implements OnInit {
  reports$: Observable<ReportEntity[]>;
  noReportCreated = false;
  errorMessage = '';

  constructor(public reportFacade: ReportFacade) {
    this.reportFacade.loadReports();
  }

  ngOnInit(): void {
    this.reports$ = this.reportFacade.allReport$;
  }
}
