import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  set(user: string) {
    localStorage.setItem('user', user);
  }
}
