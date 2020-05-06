import { Component, Input, OnInit } from "@angular/core";
import { Report } from "@training/report";

@Component({
  selector: "training-report-item",
  templateUrl: "./report-item.component.html",
  styleUrls: ["./report-item.component.scss"],
})
export class ReportItemComponent implements OnInit {
  @Input() report: Report;

  constructor() {}

  ngOnInit(): void {}
}
