import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroupDirective, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { Report } from '@training/report';
import { ReportFacade } from '@training/store/report';

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
    const jobYesterday = this.reportForm.value.jobYesterday;
    const problems = this.reportForm.value.problems;
    const jobToday = this.reportForm.value.jobToday;
    this.reportFacade.addReport(new Report(jobYesterday, problems, jobToday));
    this.reportNgForm.resetForm();
    this.router.navigate(['/report']);
  }
}
