import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { HttpServiceService } from '../../shared/http-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  userForm: FormGroup;
  constructor(private fb: FormBuilder, private service: HttpServiceService, private router: Router) { }

  ngOnInit() {
    this.userForm = this.fb.group({
      'email': [null, Validators.compose([Validators.required, Validators.pattern(/[-.\w]+@([\w-]+\.)+[\w-]+/g)])],
      'password': [null, Validators.required]
    })
  }

  rememberMe() {
    console.log(this.userForm.value);
  }

  login() {
    this.service.loginUser(this.userForm.value).subscribe((res) => {
      console.log(res);
      localStorage.setItem("token", res["token"]);
      localStorage.setItem("userId", res["userId"]);
      this.router.navigate(["tracker-list"]);
    })
  }

  register() {
    this.service.registerUser(this.userForm.value).subscribe((res) => {
      console.log(res);
    })
  }
}
