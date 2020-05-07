import { Controller, Get, Param, Post } from "@nestjs/common";

import { AppService } from './app.service';
import { Report } from "@training/report";

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

}
