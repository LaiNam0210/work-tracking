import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ReportFacade } from '@training/store/report';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroupDirective, Validators } from '@angular/forms';

@Component({
  selector: 'training-auth-page',
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.scss']
})
export class AuthPageComponent implements OnInit {
  loginForm = this.fb.group({
    username: [null, Validators.required],
    password: [null, Validators.required]
  });
  @ViewChild(FormGroupDirective) loginNgForm;
  authResult$: Observable<{ accessToken: string }>;

  constructor(
    private httpClient: HttpClient,
    private reportFacade: ReportFacade,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {}

  login() {
    this.reportFacade.login(
      this.loginForm.value.username,
      this.loginForm.value.password
    );
    this.loginNgForm.resetForm();
  }
}
