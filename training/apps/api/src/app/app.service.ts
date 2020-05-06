import { Injectable } from '@nestjs/common';

import { Report } from '@training/report';

@Injectable()
export class AppService {
  private reports: Report[] = [
    new Report(
      '1',
      'Implement mock database',
      'I dont know anything about database',
      'Implement showing list of reports'
    ),
    new Report(
      '2',
      'Implement showing list of reports',
      'Nothing',
      'Implement showing a report in detail'
    ),
    new Report(
      '3',
      'Implement showing a report in detail',
      'Routing',
      'Fix bugs having in yesterday work.'
    )
  ];

  getReports(): Report[] {
    return this.reports;
  }

  getReportByIndex(index: number): Report {
    return this.reports[index];
  }

  addReport(report: Report): void {
    this.reports.unshift(report);
  }
}
