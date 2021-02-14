import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LandingComponent } from './landing/landing.component';
import { ProfileComponent } from './profile/profile.component';
import { SignupComponent } from './signup/signup.component';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { SigninComponent } from './signin/signin.component';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { WishListComponent } from './wish-list/wish-list.component';
import { TableModule } from 'primeng/table'
import { RatingModule } from 'primeng/rating';
import { ChatComponent } from './chat/chat.component';
import { DialogModule } from 'primeng/dialog';
import { AuthLandingComponent } from './Auth-landing/auth-landing/auth-landing.component';

//my imports
import { CarouselModule } from 'ngx-owl-carousel-o';
import {MatIconModule} from '@angular/material/icon';
import { WishItemComponent } from './wish-item/wish-item.component';
@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        NgbModule,
        SlickCarouselModule,
        ReactiveFormsModule,
        RouterModule,
        CarouselModule,
        ButtonModule,
        ToastModule,
        HttpClientModule,
        BrowserAnimationsModule,
        TableModule,
        RatingModule,
        DialogModule,
        MatIconModule

    ],
    declarations: [
        LandingComponent,
        SignupComponent,
        ProfileComponent,
        SigninComponent,
        WishListComponent,
        ChatComponent,
        AuthLandingComponent,
        WishItemComponent,
    ],
})
export class ExamplesModule { }
