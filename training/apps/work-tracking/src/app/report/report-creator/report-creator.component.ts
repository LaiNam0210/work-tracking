import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'training-report-creator',
  templateUrl: './report-creator.component.html',
  styleUrls: ['./report-creator.component.scss']
})
export class ReportCreatorComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  onSubmit(form: NgForm): void {
    console.log('Add report clicked!');
  }
}
