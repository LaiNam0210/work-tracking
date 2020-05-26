import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ReportFacade } from '@training/store/report';
import { Observable } from 'rxjs';

@Component({
  selector: 'training-auth-page',
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.scss']
})
export class AuthPageComponent implements OnInit {
  authResult$: Observable<{ accessToken: string }>;

  constructor(
    private httpClient: HttpClient,
    private reportFacade: ReportFacade
  ) {}

  ngOnInit(): void {}

  login() {
    console.log('Login!');
    this.reportFacade.login('john', 'changeme');
  }
}
