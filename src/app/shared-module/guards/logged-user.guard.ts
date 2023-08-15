import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../authentication/auth.service';
import { createInjectableType } from '@angular/compiler';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class loggedUserGuard{
  constructor(private auth: AuthService, private router: Router){}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | void{
    if(this.auth.getCurrentUser()){
      return true;
    }else{
      this.router.navigate(['/login']);
    }
  }
};
