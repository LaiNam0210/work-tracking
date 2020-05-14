import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';

import { AppService } from './app.service';
import { Report } from '@training/report';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('report')
  getReports(): Report[] {
    return this.appService.getReports();
  }

  @Get('report/:index')
  getReportById(@Param() params): Report {
    return this.appService.getReportByIndex(+params.index);
  }

  @Post('add_report')
  addReport(
    @Body('jobYesterday') jobYesterday: string,
    @Body('problems') problems: string,
    @Body('jobToday') jobToday: string
  ) {
    const addedReport = this.appService.addReport(
      jobYesterday,
      problems,
      jobToday
    );
    return addedReport;
  }

  @Delete('delete_report/:index')
  deleteReport(@Param('index') index: string): { deletedId: string } {
    return this.appService.deleteReport(+index);
  }
}
