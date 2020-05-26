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

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.route.data.subscribe((data: Data) => {
      this.errorMessage = data['message'];
      this.back = data['back'];
    });
  }

  onBack() {
    switch (this.back) {
      case 'AUTH':
        this.router.navigate(['/auth']);
        break;
      case 'REPORT':
        this.router.navigate(['/report']);
        break;
      default:
        this.router.navigate(['/report']);
        break;
    }
  }
}
