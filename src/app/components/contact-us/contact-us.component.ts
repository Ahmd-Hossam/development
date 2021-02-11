import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'app/services/auth.service';
import { SharedService } from 'app/services/shared.service';
import { ToastrService } from 'ngx-toastr';
import { ContactService } from 'app/services/contact.service'
import * as AOS from 'aos'
@Component({
  selector: 'contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss']
})
export class ContactUsComponent implements OnInit {
  focus: any;
  focus1: any;
  constructor(
    private _fb: FormBuilder,
    private _route: ActivatedRoute,
    private _router: Router,
    private _auth: AuthService,
    private ContactService: ContactService,
    private _toastr: ToastrService,
    private sharedServices: SharedService) {
    AOS.init()
  }
  ContactForm: FormGroup
  ngOnInit(): void {
    this.initForm()
  }
  initForm() {
    this.ContactForm = this._fb.group({
      name: [],
      email: ['', Validators.compose([
        Validators.required,
        Validators.email,
        Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$')
      ])],
      phone_number: [],
      message: [],
    });
  }
  onSubmit() {
    console.log(this.ContactForm.value);

    debugger
    this.ContactService.SendMessage(this.ContactForm.value).subscribe(res => {
      this.ContactForm.reset()
      this._toastr.success('We got Your Message Success!', 'Success');
      console.log(res);
    })
    // this.
  }
}
