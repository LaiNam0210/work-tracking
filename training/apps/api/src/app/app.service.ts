import { Injectable } from '@nestjs/common';

import { Report } from '@training/report';
import {
  ReportCreateRequest,
  ReportUpdateRequest
} from '@training/report-interfaces';
@Injectable()
export class AppService {
  private reports: Report[] = [
    {
      id: 101,
      jobYesterday: 'Special',
      problems: 'Special',
      jobToday: 'Special',
      timeCreated: Date.now()
    } as Report,
    {
      id: 102,
      jobYesterday: 'Dummy',
      problems: 'Dummy',
      jobToday: 'Dummy',
      timeCreated: Date.now()
    } as Report,
    {
      id: 103,
      jobYesterday: 'Dummy',
      problems: 'Dummy',
      jobToday: 'Dummy',
      timeCreated: Date.now()
    } as Report,
    {
      id: 104,
      jobYesterday: 'Dummy',
      problems: 'Dummy',
      jobToday: 'Dummy',
      timeCreated: Date.now()
    } as Report,
    {
      id: 105,
      jobYesterday: 'Dummy',
      problems: 'Dummy',
      jobToday: 'Dummy',
      timeCreated: Date.now()
    } as Report,
    {
      id: 106,
      jobYesterday: 'Dummy',
      problems: 'Dummy',
      jobToday: 'Dummy',
      timeCreated: Date.now()
    } as Report,
    {
      id: 107,
      jobYesterday: 'Dummy',
      problems: 'Dummy',
      jobToday: 'Dummy',
      timeCreated: Date.now()
    } as Report,
    {
      id: 108,
      jobYesterday: 'Dummy',
      problems: 'Dummy',
      jobToday: 'Dummy',
      timeCreated: Date.now()
    } as Report,
    {
      id: 109,
      jobYesterday: 'Dummy',
      problems: 'Dummy',
      jobToday: 'Dummy',
      timeCreated: Date.now()
    } as Report,
    {
      id: 110,
      jobYesterday: 'Dummy',
      problems: 'Dummy',
      jobToday: 'Dummy',
      timeCreated: Date.now()
    } as Report,
    {
      id: 111,
      jobYesterday: 'Dummy',
      problems: 'Dummy',
      jobToday: 'Dummy',
      timeCreated: Date.now()
    } as Report,
    {
      id: 112,
      jobYesterday: 'Dummy',
      problems: 'Dummy',
      jobToday: 'Dummy',
      timeCreated: Date.now()
    } as Report,
    {
      id: 113,
      jobYesterday: 'Dummy',
      problems: 'Dummy',
      jobToday: 'Dummy',
      timeCreated: Date.now()
    } as Report,
    {
      id: 114,
      jobYesterday: 'Dummy',
      problems: 'Dummy',
      jobToday: 'Dummy',
      timeCreated: Date.now()
    } as Report,
    {
      id: 115,
      jobYesterday: 'Dummy',
      problems: 'Dummy',
      jobToday: 'Dummy',
      timeCreated: Date.now()
    } as Report
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
