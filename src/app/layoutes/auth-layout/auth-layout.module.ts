import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthLayoutRoutingModule } from './auth-layout.routing';
import { AuthLayoutComponent } from './auth-layout.component';


@NgModule({
  declarations: [AuthLayoutComponent],
  imports: [
    CommonModule,
    AuthLayoutRoutingModule
  ]
})
export class AuthLayoutModule { }
