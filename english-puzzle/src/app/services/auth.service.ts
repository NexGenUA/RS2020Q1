import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const API_URL = new URL('http://localhost:4000/');

export interface User {
  email: string;
  password: string;
}

export interface UserCreate {
  id: string;
  email: string;
}

interface Statistics {
  [key: string]: any;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  register(user: User): Observable<UserCreate> {
    API_URL.pathname = 'user';
    const url = API_URL.toString();
    const headers = new HttpHeaders({
      Accept: 'application/json',
      'Content-Type': 'application/json',
    });
    return this.http.post<UserCreate>(url, JSON.stringify(user), { headers });
  }

  setSettings(userId: string, token: string, settings: any): Observable<any> {
    API_URL.pathname = `/users/${userId}/settings`;
    const url = API_URL.toString();
    const headers = new HttpHeaders({
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    });
    return this.http.put(url, settings, { headers });
  }

  getSettings(userId: string, token: string): Observable<any> {
    API_URL.pathname = `/users/${userId}/settings`;
    const url = API_URL.toString();
    const headers = new HttpHeaders({
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    });
    return this.http.get(url, { headers });
  }
}
