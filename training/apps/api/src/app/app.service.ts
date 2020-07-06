import { Injectable } from '@nestjs/common';

import { Report } from '@training/report';
import {
  ReportCreateRequest,
  ReportUpdateRequest
} from '@training/report-interfaces';
@Injectable()
export class AppService {
  private reports: Report[] = [
    new Report(101, 'Special', 'Special', 'Special', Date.now()),
    new Report(102, 'Dummy', 'Dummy', 'Dummy', Date.now()),
    new Report(103, 'Dummy', 'Dummy', 'Dummy', Date.now()),
    new Report(104, 'Dummy', 'Dummy', 'Dummy', Date.now()),
    new Report(105, 'Dummy', 'Dummy', 'Dummy', Date.now()),
    new Report(106, 'Dummy', 'Dummy', 'Dummy', Date.now()),
    new Report(107, 'Dummy', 'Dummy', 'Dummy', Date.now()),
    new Report(108, 'Dummy', 'Dummy', 'Dummy', Date.now()),
    new Report(109, 'Dummy', 'Dummy', 'Dummy', Date.now()),
    new Report(110, 'Dummy', 'Dummy', 'Dummy', Date.now()),
    new Report(112, 'Dummy', 'Dummy', 'Dummy', Date.now()),
    new Report(113, 'Dummy', 'Dummy', 'Dummy', Date.now()),
    new Report(114, 'Dummy', 'Dummy', 'Dummy', Date.now())
  ];

  getReports(): Report[] {
    return this.reports;
  }

  getReportById(id: number): Report {
    return this.reports.find(report => report.id === id);
  }

  private getCurrentLargestId() {
    return Math.max.apply(
      Math,
      this.reports.map(function(report) {
        return report.id;
      })
    );
  }

  private createReportFromRequest(req: ReportCreateRequest) {
    const createdReport = {
      id: this.getCurrentLargestId() + 1,
      jobYesterday: req.jobYesterday,
      problems: req.problems,
      jobToday: req.jobToday,
      timeCreated: Date.now()
    } as Report;
    return createdReport;
  }

  addReport(req: ReportCreateRequest): Report {
    const createdReport = this.createReportFromRequest(req);
    this.reports.unshift(createdReport);
    return createdReport;
  }

  private getPositionById(id: number): number {
    return this.reports
      .map(report => {
        return report.id;
      })
      .indexOf(id);
  }

  deleteReport(id: number): number {
    const position = this.getPositionById(id);
    this.reports.splice(position, position + 1);
    return id;
  }

  updateReport(id: number, req: ReportUpdateRequest): Report {
    const selectedReport = this.getReportById(id);
    if (!!selectedReport) {
      selectedReport.jobYesterday = req.jobYesterday;
      selectedReport.problems = req.problems;
      selectedReport.jobToday = req.jobToday;
      return selectedReport;
    }
  }
}
