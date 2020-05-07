import { Component, OnInit } from "@angular/core";
import { Report } from "@training/report";
import { HttpClient } from "@angular/common/http";
import { ActivatedRoute, Params } from "@angular/router";

@Component({
  selector: "training-report-detail",
  templateUrl: "./report-detail.component.html",
  styleUrls: ["./report-detail.component.scss"],
})
export class ReportDetailComponent implements OnInit {
  report: Report;
  id: string;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
  ) {
  }

  ngOnInit(): void {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = params["index"];
          this.fetchReportById(this.id);
          //FIXME: The app work well but there is some errors in console
        },
        (error: Error) => {
          console.log(error.message);
        },
      );
  }

  fetchReportById(id: string): void {
    this.http.get<Report>("api/report/" + this.id)
      .subscribe(
        (report: Report) => {
          this.report = report;
          console.log(this.report);
        },
        (error: Error) => {
          console.log(error.message);
        },
      );
  }

  onDelete(): void {
    //TODO:
  }
}
