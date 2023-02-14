import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LocalService } from 'src/app/services/local.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loading = false;
  submitted = false;
  loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private local: LocalService
  ) {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.f['username'].value == '';
    this.f['password'].value == '';
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.loginForm.invalid) {
      alert('Please fill in the fields');
      return;
    }
    this.loading = true;
    if (
      this.f['username'].value == 'admin' &&
      this.f['password'].value == 'admin'
    ) {
      this.loading = false;
      let loginData = {
        username: 'admin',
        password: 'admin',
      };
      this.local.saveData('loginData', loginData);
      this.router.navigate(['/home']);
    } else {
      this.loading = false;
      alert('The credentials are incorrect');
    }
  }
}
