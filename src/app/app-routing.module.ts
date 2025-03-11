import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './guards/auth.guard';
import { Assesment1Component } from './assesment1/assesment1.component';
import { Assesment2Component } from './assesment2/assesment2.component';
import { Assesment3Component } from './assesment3/assesment3.component';
import { Assesment4Component } from './assesment4/assesment4.component';
import { Assesment5Component } from './assesment5/assesment5.component';
import { SuccessComponent } from './success/success.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'assesment1', component: Assesment1Component, canActivate: [AuthGuard] },
  { path: 'assesment2', component: Assesment2Component, canActivate: [AuthGuard] },
  { path: 'assesment3', component: Assesment3Component, canActivate: [AuthGuard] },
  { path: 'assessment4', component: Assesment4Component, canActivate: [AuthGuard] },
  { path: 'assessment5', component: Assesment5Component, canActivate: [AuthGuard] },
  { path: 'success', component: SuccessComponent, canActivate: [AuthGuard] },

  
  


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
