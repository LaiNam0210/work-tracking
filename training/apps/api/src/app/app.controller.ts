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
import {
  ReportCreateRequest,
  ReportUpdateRequest,
  ReportUpdateResponse
} from '@training/report-interfaces';

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
  @Get('report/:id')
  getReportById(@Param() params): Report {
    return this.appService.getReportById(+params.id);
  }

  @Post('report')
  addReport(@Body('req') req: ReportCreateRequest): Report {
    return this.appService.addReport(req);
  }

  @Delete('report/:id')
  deleteReport(@Param() params): number {
    return this.appService.deleteReport(+params.id);
  }

  @Put('report/:id')
  updateReport(
    @Param() params,
    @Body('req') req: ReportUpdateRequest
  ): ReportUpdateResponse {
    return this.appService.updateReport(+params.id, req);
  }
}
