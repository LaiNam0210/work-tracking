import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
  reportForm: FormGroup;

  constructor(
    private http: HttpClient,
    private reportFacade: ReportFacade,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.reportForm = new FormGroup({
      jobYesterday: new FormControl(null, Validators.required),
      problems: new FormControl(null, Validators.required),
      jobToday: new FormControl(null, Validators.required)
    });
  }

  onReportSubmit() {
    const jobYesterday = this.reportForm.value.jobYesterday;
    const problems = this.reportForm.value.problems;
    const jobToday = this.reportForm.value.jobToday;
    this.reportFacade.addReport(new Report(jobYesterday, problems, jobToday));
    this.router.navigate(['/report']);
  }
}
