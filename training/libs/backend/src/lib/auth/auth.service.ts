import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  login(
    username: string,
    password: string
  ): Observable<{ accessToken: string; expirationDate: number }> {
    const url = '/api/auth/login';
    return this.http.post<{ accessToken: string; expirationDate: number }>(
      url,
      { username, password }
    );
  }

  constructor(private http: HttpClient) {}
}
