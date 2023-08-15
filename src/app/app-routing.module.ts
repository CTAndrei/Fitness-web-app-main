import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponentComponent } from './authentication-module/login-component/login-component.component';
import { TabComponent } from './home-module/tab.component';
import { ErrorMessageComponent } from './authentication-module/error-message/error-message.component';
import { loggedUserGuard } from './shared-module/guards/logged-user.guard';

const routes: Routes = [
  {path: 'login', component: LoginComponentComponent}, 
  {path: '', redirectTo: 'login', pathMatch: 'full'}, 
  {path: 'scheduler', component: TabComponent, canActivate: [loggedUserGuard]},
  {path: '**', component: ErrorMessageComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
