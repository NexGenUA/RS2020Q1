import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { AuthService, User } from '../services/auth.service';
import { DataService } from '../services/data.service';
import { Md5 } from 'ts-md5/dist/md5';

const REGEXP_EMAIL = /^(?:[a-z0-9_\.\-])+\@(?:(?:[a-z0-9\-])+\.)+(?:[a-z0-9]{2,4})+$/i;
const REGEXP_PASSWORD = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\+\-_@$!%*?&#\.,;\:\[\]\{\}])[A-Za-z\d\+\-_@$!%*?&#\.,;\:\[\]\{\}]{8,}$/;

@Component({
  selector: 'app-auth-window',
  templateUrl: './auth-window.component.html',
  styleUrls: ['./auth-window.component.scss'],
})
export class AuthWindowComponent implements OnInit {
  formLogin: FormGroup;
  formRegister: FormGroup;
  isLog = true;
  symbols = '+-_@$!%*?&#.,;:[]{}';
  errorReg = false;
  errorLogin = false;

  constructor(
    private authService: AuthService,
    private dataService: DataService
  ) {}

  ngOnInit(): void {
    this.formRegister = new FormGroup({
      email: new FormControl('', [
        Validators.pattern(REGEXP_EMAIL),
        Validators.required,
      ]),
      password: new FormControl('', [
        Validators.pattern(REGEXP_PASSWORD),
        Validators.required,
      ]),
    });
    this.formLogin = new FormGroup({
      email: new FormControl('', [
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
    this.errorReg = false;
    this.errorLogin = false;
  }

  register() {
    this.errorReg = false;
    this.errorLogin = false;
    const user: User = this.formRegister.value;
    const idx = Md5.hashStr(user.email + user.password).toString();
    this.authService.register(user).subscribe(
      (res) => {
        const user = {};
        user[idx] = res;
        this.dataService.set(JSON.stringify(user));
      },
      (err) => {
        this.errorReg = true;
        console.log(err.error);
      }
    );
  }
}
