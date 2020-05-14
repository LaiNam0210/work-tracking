import { Injectable } from '@nestjs/common';

import { Report } from '@training/report';

@Injectable()
export class AppService {
  private reports: Report[] = [
    new Report('Special', 'Special', 'Special'),
    new Report('Dummy', 'Dummy', 'Dummy'),
    new Report('Dummy', 'Dummy', 'Dummy'),
    new Report('Dummy', 'Dummy', 'Dummy'),
    new Report('Dummy', 'Dummy', 'Dummy'),
    new Report('Dummy', 'Dummy', 'Dummy'),
    new Report('Dummy', 'Dummy', 'Dummy'),
    new Report('Dummy', 'Dummy', 'Dummy'),
    new Report('Dummy', 'Dummy', 'Dummy'),
    new Report('Dummy', 'Dummy', 'Dummy'),
    new Report('Dummy', 'Dummy', 'Dummy')
  ];

  getReports(): Report[] {
    return this.reports;
  }

  getReportByIndex(index: number): Report {
    return this.reports[index];
  }

  addReport(jobYesterday: string, problems: string, jobToday: string) {
    const report = new Report(jobYesterday, problems, jobToday);
    this.reports.unshift(report);
    return report;
  }

  deleteReport(index: number): { deletedId: string } {
    const deletedId = this.reports[index].id;
    this.reports.splice(index, index + 1);
    return { deletedId: deletedId };
  }
}
