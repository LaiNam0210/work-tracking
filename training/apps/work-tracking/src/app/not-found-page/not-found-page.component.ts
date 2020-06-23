import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'training-not-found-page',
  templateUrl: './not-found-page.component.html',
  styleUrls: ['./not-found-page.component.scss']
})
export class NotFoundPageComponent implements OnInit {
  errorMessage: string;
  backMessage: string;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.errorMessage = 'Page not found!';
    this.backMessage = 'Back to report page';
  }

  onBack() {
    this.router.navigate(['/report']);
  }
}
