import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthenticationRoutingModule } from './authentication-routing.module';
import { LoginComponentComponent } from './login-component/login-component.component';
import { ReactiveFormsModule } from '@angular/forms';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { ErrorMessageComponent } from './error-message/error-message.component';


@NgModule({
  declarations: [
    LoginComponentComponent,
    ErrorMessageComponent,
  ],
  imports: [
    CommonModule,
    AuthenticationRoutingModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule
  ],
  exports: [
    LoginComponentComponent,
    ErrorMessageComponent
  ]
})
export class AuthenticationModule { }
