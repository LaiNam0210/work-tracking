import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ReportFacade } from '@training/store/report';
import { ReportCreateRequest } from '@training/report-interfaces';

@Component({
  selector: 'training-report-creator',
  templateUrl: './report-creator.component.html',
  styleUrls: ['./report-creator.component.scss']
})
export class ReportCreatorComponent implements OnInit {
  constructor(private http: HttpClient, private reportFacade: ReportFacade) {}

  ngOnInit(): void {}

  onAddReport = (req: ReportCreateRequest) => {
    this.reportFacade.addReport(req);
  };
}
