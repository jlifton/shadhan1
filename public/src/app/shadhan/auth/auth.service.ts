import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {LoginResponse} from "../login/login-response.interface";
import {MatSnackBar} from "@angular/material";

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate{
  private authenticated = false;
  private token:string = '';
  private loggedInUser:LoginResponse ;

  constructor(private router: Router, private snackbar: MatSnackBar) { }

  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot){
    if (this.authenticated === false) {
      this.router.navigate(['/login']);
      return false;
    }
    if (state.url === '/operators/operators-table'){
      if (this.loggedInUser.type !== 'ADMIN') {
        this.snackbar.open("Selected page is accessible to Administrator operators only", null, {
          duration: 5000,
          verticalPosition: 'top',
          horizontalPosition: 'center'
        });
        return false;
      }
    }
    return true;
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

  getType() {
    return this.loggedInUser.type;
  }
}
