import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
const REGEXP_EMAIL = /^(?:[a-z0-9_\.\-])+\@(?:(?:[a-z0-9\-])+\.)+(?:[a-z0-9]{2,4})+$/i;
const REGEXP_PASSWORD = /([a-z])+([A-Z])+([+-_@$!%*?&#.,;:[]{}])+/i;

@Component({
  selector: 'app-auth-window',
  templateUrl: './auth-window.component.html',
  styleUrls: ['./auth-window.component.scss'],
})
export class AuthWindowComponent implements OnInit {
  formLogin: FormGroup;
  formRegister: FormGroup;
  isLog = true;

  constructor() {}

  ngOnInit(): void {
    this.formRegister = new FormGroup({
      login: new FormControl('', [
        Validators.pattern(REGEXP_EMAIL),
        Validators.required,
      ]),
      password: new FormControl('', [
        Validators.pattern(REGEXP_PASSWORD),
        Validators.required,
      ]),
    });
    this.formLogin = new FormGroup({
      login: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
      ]),
    });
  }

  login() {
    console.log(this.formLogin);
  }

  register() {}
}
