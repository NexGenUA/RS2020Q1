import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-auth-window',
  templateUrl: './auth-window.component.html',
  styleUrls: ['./auth-window.component.scss'],
})
export class AuthWindowComponent implements OnInit {
  loginField = '';
  passwordField = '';

  constructor() {}

  ngOnInit(): void {}

  login() {
    console.log(this.loginField, this.passwordField);
  }

  register() {}
}
