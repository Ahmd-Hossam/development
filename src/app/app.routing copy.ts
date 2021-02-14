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
// import { ChatComponent } from './website/chat/chat.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'signup', component: SignupComponent },
  { path: 'signin', component: SigninComponent },
  { path: 'home', component: LandingComponent },
  { path: 'contactus', component: ContactUsComponent },
  { path: 'profile', component: ProfileComponent },
  {path: 'home-auth/wish-item', component:WishListComponent},
  //{ path: 'wish-list', component: WishListComponent },
  // { path: 'Contact-Company/:id', component: ChatComponent },
  { path: 'Contact-Company', component: ChatComponent },
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
