import { Component, OnInit } from '@angular/core';
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
  isEditMode = false;
  error$ = this.reportFacade.error$;

  constructor(private reportFacade: ReportFacade) {}

  ngOnInit(): void {
    this.report$ = this.reportFacade.selectedReport$;
  }

  onDelete(): void {
    this.reportFacade.deleteSelectedReport();
  }

  onEdit(): void {
    this.isEditMode = true;
  }

  onEditUpdate = (req: ReportUpdateRequest) => {
    this.isEditMode = false;
    this.reportFacade.updateReport(req);
  };
}
