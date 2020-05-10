import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'training-report-creator',
  templateUrl: './report-creator.component.html',
  styleUrls: ['./report-creator.component.scss']
})
export class ReportCreatorComponent implements OnInit {
  reportForm: FormGroup;

  constructor(private http: HttpClient) {}

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
    this.addReport(jobYesterday, problems, jobToday);
  }

  addReport(jY: string, pr: string, jT: string) {
    return this.http
      .post('/api/add_report', { jobYesterday: jY, problems: pr, jobToday: jT })
      .subscribe(
        () => console.log('Done!'),
        error => console.log(error)
      );
  }
}
