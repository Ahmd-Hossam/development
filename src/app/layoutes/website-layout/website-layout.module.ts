import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WebsiteLayoutRoutingModule } from './website-layout-routing.module';
import { WebsiteLayoutComponent } from './website-layout.component';


@NgModule({
  declarations: [WebsiteLayoutComponent],
  imports: [
    CommonModule,
    WebsiteLayoutRoutingModule
  ]
})
export class WebsiteLayoutModule { }
