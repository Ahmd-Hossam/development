import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
// import { first } from 'rxjs-compat/operator/first';
import { AuthService } from 'app/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { ConfirmedValidator } from 'app/helpers/confirmed.validator';
import { first } from 'rxjs/operators';
import { User } from 'app/models/user';
import * as AOS from 'aos';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
    SignUpForm: FormGroup;
    constructor(
        private _fb: FormBuilder,
        private _route: ActivatedRoute,
        private _router: Router,
        private _auth: AuthService,
        private _toastr: ToastrService
    ) { }
    ngOnInit() {
        AOS.init();
        this.initForm();
    }
    initForm() {
        this.SignUpForm = this._fb.group({
            name: [''],
            FirstName: [''],
            LastName: [''],
            gender: [''],
            address: [''],
            birth_date: [''],
            phone_number: [''],
            email: ['', Validators.compose([
                Validators.email,
                Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$')
            ]),
            ],
            password: [''],
        },
        );

    }
    onSubmit() {
        this.SignUpForm.get('name').setValue(this.SignUpForm.get('FirstName').value + " " + this.SignUpForm.get('LastName').value)
        this.callServer()
    }
    callServer() {
        this._auth.register(this.SignUpForm.value)
            .pipe(first())
            .subscribe(
                (data: any) => {
                    if (data.id) {
                        this._toastr.success('Registration successful!', 'Success');
                        this._router.navigate(['/signin'])
                    }
                },
                error => {
                    if (error) {
                        if (error.non_field_errors) {
                            this._toastr.error(error.non_field_errors);
                        }
                        if (error.birth_date) {
                            this._toastr.error(error.birth_date);
                        }
                        if (error.email) {
                            this._toastr.error(error.email);
                        }
                        if (error.gender) {
                            this._toastr.error(error.gender);
                        }
                        if (error.password) {
                            this._toastr.error(error.password);
                        }
                        if (error.phone_number) {
                            this._toastr.error(error.phone_number);
                        }
                        if (error.referral_code) {
                            this._toastr.error(error.referral_code);
                        }
                    }
                });
    }
    ShowPassord = false
    showPassword() {
        this.ShowPassord = !this.ShowPassord
    }
}
// email: ['', Validators.compose([
//     Validators.required,
//     Validators.email,
//     Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$')
// ])],


// password: ['', Validators.compose([
//     Validators.required,
//     Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/),
//     Validators.minLength(8)
// ])],