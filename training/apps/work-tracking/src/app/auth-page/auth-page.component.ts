import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroupDirective, Validators } from '@angular/forms';
import { AuthFacade } from '@training/store/auth';

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

  constructor(
    private httpClient: HttpClient,
    private authFacade: AuthFacade,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {}

  login() {
    this.authFacade.login(
      this.loginForm.value.username,
      this.loginForm.value.password
    );
    this.loginNgForm.resetForm();
  }
}
