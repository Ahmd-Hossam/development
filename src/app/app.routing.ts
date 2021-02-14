import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { LandingComponent } from './website/landing/landing.component';
import { SignupComponent } from './website/signup/signup.component';
import { AuthGuard } from './helpers/auth.guard';
import { CompressionComponent } from './components/compression/compression.component';
import { SigninComponent } from './website/signin/signin.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { ProfileComponent } from './website/profile/profile.component';
import { WishListComponent } from './website/wish-list/wish-list.component';
import { ChatComponent } from './website/chat/chat.component';
import { AuthLandingComponent } from './website/Auth-landing/auth-landing/auth-landing.component';
import { WishItemComponent } from './website/wish-item/wish-item.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'signup', component: SignupComponent },
  { path: 'signin', component: SigninComponent },
  { path: 'home', component: LandingComponent },
  { path: 'contactus', component: ContactUsComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'wish-list', component: WishListComponent },
  {path: 'home-auth/wish-item', component:WishItemComponent},
  { path: 'home-auth', component: AuthLandingComponent },
  { path: 'Contact-Company/:id', component: ChatComponent },
  { path: 'auth', loadChildren: './layoutes/auth-layout/auth-layout.module#AuthLayoutModule' },
  { path: 'website', loadChildren: './layoutes/website-layout/website-layout.module#WebsiteLayoutModule', canActivate: [AuthGuard] },
  { path: 'compression', component: CompressionComponent },
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes, {
      useHash: true
    })
  ]
})
export class AppRoutingModule { }
