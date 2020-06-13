import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
  Request
} from '@nestjs/common';

import { AppService } from './app.service';
import { Report } from '@training/report';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private authService: AuthService
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('report')
  getReports(): Report[] {
    return this.appService.getReports();
  }

  @UseGuards(JwtAuthGuard)
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

  @Put('update_report/')
  updateReport(
    @Body('id') id: string,
    @Body('newJYesterday') newJYesterday: string,
    @Body('newProblems') newProblems: string,
    @Body('newJToday') newJToday: string
  ): Report {
    return this.appService.updateReport({
      id,
      newJYesterday,
      newProblems,
      newJToday
    });
  }
}
