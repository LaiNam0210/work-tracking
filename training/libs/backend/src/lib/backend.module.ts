import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportService } from './report/report.service';
import { AuthService } from './auth/auth.service';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [ReportService, AuthService]
})
export class BackendModule {}
