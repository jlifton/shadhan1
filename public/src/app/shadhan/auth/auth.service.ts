import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {LoginResponse} from "../login/login-response.interface";

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate{
  private authenticated = false;
  private token:string = '';
  private loggedInUser:LoginResponse ;

  constructor(private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot){
    if (this.authenticated)
      return true;
    this.router.navigate(['/login']);
    return false;
  }

  isAuthenticated(): boolean {
    return this.authenticated;
  }

  clearAuthenticated() {
    this.authenticated = false;
    this.token = '';
    this.loggedInUser = null;
  }

  setAuthenticated(token: string, loggedInUser:LoginResponse) {
    this.token = token;
    this.loggedInUser = loggedInUser;
    this.authenticated = true;
  }

  getToken(): string {
    return this.token;
  }

  getLoggedInUserName(): string {
    if (!(this.isAuthenticated()))
      return '';
    return this.loggedInUser.name;
  }
}
