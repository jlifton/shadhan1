import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { fadeOutAnimation } from '../../core/common/route.animation';
import {LoginService} from "./login.service";
import {AuthGuardService} from "../auth/auth.service";
import {MatSnackBar} from "@angular/material";

@Component({
  selector: 'fury-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  host: {
    '[@fadeOutAnimation]': 'true'
  },
  animations: [fadeOutAnimation]
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  inputType = 'password';
  visible = false;
  rememberMeChecked = false;

  constructor(private router: Router,
              private fb: FormBuilder,
              private cd: ChangeDetectorRef,
              private loginService: LoginService,
              private authGuardService: AuthGuardService,
              private snackbar: MatSnackBar
  ) { }

  ngOnInit() {
    this.authGuardService.clearAuthenticated();
    this.form = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(6)]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
    this.initCachedFields();

  }

  saveCacheFields(){
    localStorage.setItem('localuser', this.form.value.username);
  }

  clearCachedFields() {
    localStorage.setItem('localuser', '');
  }

  initCachedFields(){
    const localuser = localStorage.getItem('localuser');


    this.form.patchValue({
      username: localuser
    });

    if ((localuser !== null) && (localuser != '')){
        this.rememberMeChecked = true;
    }
  }
  isRememberMeChecked(): boolean{
    return this.rememberMeChecked;
  }
  send() {
    console.log(this.form.status);
    const userName = this.form.value.username;
    const password =  this.form.value.password;
    this.loginService.login(userName, password).subscribe(
      resp => {
              if (this.isRememberMeChecked())
                this.saveCacheFields();
              const keys = resp.headers.keys();
              const headers = keys.map(key =>
                `${key}: ${resp.headers.get(key)}`);
              const token = resp.headers.get('x-auth-token');
              console.log('JWT token: '+ token);

              // Save data to sessionStorage
              sessionStorage.setItem('x-auth-token', token);

              // Get saved data from sessionStorage
              var data = sessionStorage.getItem('x-auth-token');
              console.log('Retrieved session JWT token: '+ data);
              const operator = resp.body.name;

        var operatorType = '';
        if (resp.body && resp.body.type)
          operatorType = resp.body.type;

        var text = operatorType === 'GUEST' ?
          'Shalom '+ operator + '. As a \'Guest\' all data displayed is ARTIFICIAL.':
          'Shalom '+ operator + '. Kindly observe halachot of \'lashon hara\' while using this site';
        var waitTime = operatorType === 'GUEST' ? 8000: 3000;
        this.snackbar.open( text, null,  {
                duration: waitTime,
                verticalPosition: 'top',
                horizontalPosition: 'end'
              });

              this.authGuardService.setAuthenticated(token, resp.body);
              this.router.navigate(['singles/singles-table']);
            },
          err => {
            this.clearCachedFields();
              console.error(err);
              if (err.error !== null){
                //alert("Unable to login: "+ err.error);
                 let errMsg = err.error;
                 if (errMsg instanceof ProgressEvent){
                   errMsg = 'There may be a communications error with the site';
                 }
                 this.snackbar.open("Unable to login: "+ errMsg, 'OK', {
                  duration: 10000,
                  verticalPosition: 'top',
                  horizontalPosition: 'center'
                 });
                //let snackBarRef = this.snackbar.open("Unable to login: "+ err.error, 'OK');

                return;
              }
              if (err.status === 404){
                //alert("Unable to login with user name and password given. Please try again.");
                  this.snackbar.open("Unable to login with user name and password given. Please try again.", 'OK', {
                  duration: 10000
                });
                return;
              }
              //alert("Unable to login");
              this.snackbar.open("Unable to login", 'OK', {
                duration: 10000
                });
              },
            () => console.log('done logging in')
        );
  }

  show() {
    this.inputType = 'text';
    this.visible = true;
    this.cd.markForCheck();
  }

  hide() {
    this.inputType = 'password';
    this.visible = false;
    this.cd.markForCheck();
  }

  eventHandler(event) {
    if (event.keyCode === 13) {
      if (this.form.status === 'VALID')
        this.send();
    }
  }
}
