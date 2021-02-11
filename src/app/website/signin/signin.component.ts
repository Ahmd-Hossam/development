import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'app/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { first } from 'rxjs/operators';
import { User } from 'app/models/user';
import * as AOS from 'aos'
import { SharedService } from 'app/services/shared.service';
import { forkJoin } from 'rxjs/internal/observable/forkJoin';
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],

})
export class SigninComponent implements OnInit {

  registerForm: FormGroup;

  loading = false;
  submitted = false;

  constructor(
    private _fb: FormBuilder,
    private _route: ActivatedRoute,
    private _router: Router,
    private _auth: AuthService,
    private _toastr: ToastrService,
    private sharedServices: SharedService
  ) { AOS.init() }
  ngOnInit() {
    this.initForm();
  }
  initForm() {
    this.registerForm = this._fb.group({
      email: ['', Validators.compose([
        Validators.required,
        Validators.email,
        Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$')
      ])],
      password: ['', Validators.compose([
        Validators.required,
        Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/),
        Validators.minLength(8)
      ])]
    });
  }
  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }

  editUser: User = <User>{};

  onSubmit() {
    this.submitted = true;
    this._toastr.clear();
    this.callServer()
  }



  callServer() {
    this._auth.login(this.registerForm.get('email').value, this.registerForm.get('password').value)
      .pipe(first())
      .subscribe(
        (data: any) => {
          console.log(data);
          this._toastr.success('Login successful!', 'Success');
          this.sharedServices.TokenObject = data.access;
          localStorage.setItem('tokenObject', JSON.stringify(data.access))
          localStorage.setItem('token', JSON.stringify(data.access))
          this._router.navigate(['/home-auth'])
        },
        error => {
          if (error) {
            if (error.non_field_errors) {
              this._toastr.error(error.non_field_errors[0]);
            }
            if (error.referral_code) {
              this._toastr.error(error.referral_code[0]);
            }
            if (error.email) {
              this._toastr.error(error.email[0]);
            }
            if (error.password) {
              this._toastr.error(error.password[0]);
              this.registerForm.get('password').setErrors({ emailPassword: true });
            }
            this.loading = false;

            
          }
        });
    // get User Details
    setTimeout(() => {
      this._auth.getAll(this.sharedServices.TokenObject).subscribe(
        (res: any) => {
          console.log(res);
          localStorage.setItem('UserDetail', JSON.stringify(res))
          console.log(this.sharedServices.TokenObject);
          console.log(this.sharedServices.UserName);
        }
      )
    }, 1000);
  }
  
  ShowPassord = false
  showPassword() {
    this.ShowPassord = !this.ShowPassord
  }
}