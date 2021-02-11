import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import * as AOS from 'aos'
import { ProfileService } from 'app/services/profile.service';
import { SharedService } from 'app/services/shared.service';
@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})

export class ProfileComponent implements OnInit {
    UserForm: FormGroup;
    constructor(private fb: FormBuilder, private ProfileService: ProfileService,private shareServices:SharedService) {

    }
    UserDetail
    ngOnInit() {
        AOS.init()
        this.UserDetail = JSON.parse(localStorage.getItem('UserDetail'))
        this.initUserForm();
        console.log(this.UserDetail.name);
        console.log(this.UserForm);

    }
    initUserForm() {
        this.UserForm = this.fb.group({
            name: this.UserDetail.name,
            email: this.UserDetail.email,
            phone_number: this.UserDetail.phone_number,
            gender: this.UserDetail.gender,
            birth_date: this.UserDetail.birth_date,
            address: this.UserDetail.address,
            // password: this.UserDetail.password
        });
    }
    onSubmit() {
        this.ProfileService.Update(this.UserDetail.id, this.UserForm.value).subscribe(
            res => { res }
        )
    }
    ShowPassord = false
    showPassword() {
        this.ShowPassord = !this.ShowPassord
    }
}
