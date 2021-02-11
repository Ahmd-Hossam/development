import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NouisliderModule } from 'ng2-nouislider';
import { JwBootstrapSwitchNg2Module } from 'jw-bootstrap-switch-ng2';
import { RouterModule } from '@angular/router';
import { ComponentsComponent } from './components.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { CompressionComponent } from './compression/compression.component';
import {StepsModule} from 'primeng/steps';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        NgbModule,
        NouisliderModule,
        RouterModule,
        JwBootstrapSwitchNg2Module,
        StepsModule,
        ReactiveFormsModule,
        HttpClientModule
    ],
    declarations: [
        ComponentsComponent,
        ContactUsComponent,
        CompressionComponent
    ],
    exports:[ ComponentsComponent ]
})
export class ComponentsModule { }
