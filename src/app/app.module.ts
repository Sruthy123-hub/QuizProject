import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeaderComponent } from './header/header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
// import { AuthService } from './interceptors/auth.service';
import { ToastModule } from 'primeng/toast';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MessageService } from 'primeng/api';
import { AuthInterceptorService } from './interceptors/auth-interceptor.service';
import { Assesment1Component } from './assesment1/assesment1.component';
import { FooterComponent } from './footer/footer.component';
import { Assesment2Component } from './assesment2/assesment2.component';
import { Assesment3Component } from './assesment3/assesment3.component';
import { Assesment4Component } from './assesment4/assesment4.component';
import { Assesment5Component } from './assesment5/assesment5.component';
import { SuccessComponent } from './success/success.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    HeaderComponent,
    Assesment1Component,
    FooterComponent,
    Assesment2Component,
    Assesment3Component,
    Assesment4Component,
    Assesment5Component,
    SuccessComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    ToastModule,
    BrowserAnimationsModule
  ],
  providers:  [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true }, MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
