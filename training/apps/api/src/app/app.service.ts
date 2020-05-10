import { Injectable } from '@nestjs/common';

import { Report } from '@training/report';

@Injectable()
export class AppService {
  private reports: Report[] = [
    new Report(
      'Implement mock database',
      'I dont know anything about database',
      'Implement showing list of reports'
    ),
    new Report(
      'Implement showing list of reports',
      'Nothing',
      'Implement showing a report in detail'
    ),
    new Report(
      'Implement showing a report in detail',
      'Routing',
      'Fix bugs having in yesterday work.'
    ),
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
    return report.id;
  }
}
