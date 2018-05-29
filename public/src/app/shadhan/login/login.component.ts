import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { fadeOutAnimation } from '../../core/common/route.animation';
import {LoginService} from "./login.service";
import {AuthGuardService} from "../auth/auth.service";

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
              private authGuardService: AuthGuardService
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
              alert('Shalom '+ userName);
              this.authGuardService.setAuthenticated(token, resp.body);
              this.router.navigate(['/']);
            },
          err => {
            this.clearCachedFields();
              console.error(err);
              if (err.error !== null){
                alert("Unable to login: "+ err.error);
                return;
              }
              if (err.status === 404){
                alert("Unable to login with user name and password given. Please try again.");
                return;
              }
              alert("Unable to login");
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
