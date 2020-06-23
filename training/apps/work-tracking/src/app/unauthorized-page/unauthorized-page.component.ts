import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'training-unauthorized-page',
  templateUrl: './unauthorized-page.component.html',
  styleUrls: ['./unauthorized-page.component.scss']
})
export class UnauthorizedPageComponent implements OnInit {
  errorMessage: string;
  backMessage: string;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.errorMessage = 'You are not authorized or your session is expired!';
    this.backMessage = 'Back to login page';
  }

  onBack() {
    this.router.navigate(['/auth']);
  }
}
