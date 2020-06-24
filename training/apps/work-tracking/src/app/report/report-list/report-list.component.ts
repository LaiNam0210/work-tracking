import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ReportEntity, ReportFacade } from '@training/store/report';
import { MatSnackBar } from '@angular/material/snack-bar';
import { filter } from 'rxjs/operators';
import { Router } from '@angular/router';

enum ReportManipulatingActions {
  VIEW_ADDED_REPORT = 'VIEW_ADDED_REPORT'
}

const MSG_ADDED_REPORT = 'New report added successfully!';
const MSG_REMOVED_REPORT = 'The report was removed successfully!';

const ACTION_ADDED_REPORT = ReportManipulatingActions.VIEW_ADDED_REPORT;

@Component({
  selector: 'training-report-list',
  templateUrl: './report-list.component.html',
  styleUrls: ['./report-list.component.scss']
})
export class ReportListComponent implements OnInit {
  reports$: Observable<ReportEntity[]>;
  noReportCreated = false;
  error$ = this.reportFacade.error$;
  numOfReport = Number.MAX_SAFE_INTEGER;

  constructor(
    public reportFacade: ReportFacade,
    private snackBar: MatSnackBar,
    private router: Router
  ) {
    this.reportFacade.loadReports();
    this.reports$ = this.reportFacade.allReport$;
  }

  openSnackBar(message: string, action?: string) {
    const snackBarRef = this.snackBar.open(message, action, {
      duration: 3000
    });
    snackBarRef.onAction().subscribe(() => {
      switch (action) {
        case ReportManipulatingActions.VIEW_ADDED_REPORT:
          this.router.navigate(['/report/0']);
          break;
      }
    });
  }

  private _isOneReportAdded(currentReportList) {
    return currentReportList.length - this.numOfReport === 1;
  }

  private _isOneReportRemoved(currentReportList) {
    return currentReportList.length - this.numOfReport === -1;
  }

  ngOnInit(): void {
    this.reports$
      .pipe(filter(report => report.length !== 0))
      .subscribe(report => {
        if (this._isOneReportAdded(report)) {
          this.openSnackBar(MSG_ADDED_REPORT, ACTION_ADDED_REPORT);
        } else if (this._isOneReportRemoved(report)) {
          this.openSnackBar(MSG_REMOVED_REPORT);
        }
        this.numOfReport = report.length;
      });
  }
}
