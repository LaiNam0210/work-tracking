import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroupDirective, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { ReportFacade } from '@training/store/report';
import { ReportCreateRequest } from '@training/report-interfaces';

@Component({
  selector: 'training-report-creator',
  templateUrl: './report-creator.component.html',
  styleUrls: ['./report-creator.component.scss']
})
export class ReportCreatorComponent implements OnInit {
  reportForm = this.fb.group({
    jobYesterday: [null, Validators.required],
    problems: [null, Validators.required],
    jobToday: [null, Validators.required]
  });
  @ViewChild(FormGroupDirective) reportNgForm;

  constructor(
    private http: HttpClient,
    private reportFacade: ReportFacade,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {}

  onReportSubmit() {
    const reportPostRequest = {
      jobYesterday: this.reportForm.value.jobYesterday,
      problems: this.reportForm.value.problems,
      jobToday: this.reportForm.value.jobToday
    } as ReportCreateRequest;
    this.reportFacade.addReport(reportPostRequest);
    this.reportNgForm.resetForm();
  }
}
