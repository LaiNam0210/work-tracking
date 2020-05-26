import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data, Router } from '@angular/router';

@Component({
  selector: 'training-error-page',
  templateUrl: './error-page.component.html',
  styleUrls: ['./error-page.component.scss']
})
export class ErrorPageComponent implements OnInit {
  errorMessage: string;
  back: string;
  backMessage: string;
  backRoute: string;

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.route.data.subscribe((data: Data) => {
      this.errorMessage = data['message'];
      this.back = data['back'];
      switch (data['back']) {
        case 'AUTH':
          this.backMessage = 'Back to login page';
          this.backRoute = '/auth';
          break;
        case 'REPORT':
          this.backMessage = 'Back to report page';
          this.backRoute = '/report';
          break;
        default:
          this.backMessage = 'Back';
          break;
      }
    });
  }

  onBack() {
    this.router.navigate([this.backRoute]);
  }
}
