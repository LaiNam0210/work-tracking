import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data, Router } from "@angular/router";

@Component({
  selector: 'training-error-page',
  templateUrl: './error-page.component.html',
  styleUrls: ['./error-page.component.scss']
})
export class ErrorPageComponent implements OnInit {
  errorMessage: string;

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.route.data
      .subscribe(
        (data: Data) => {this.errorMessage = data['message'];}
      )
  }

  onBackToReport() {
    this.router.navigate(['/']).then(response => {});
  }

}
