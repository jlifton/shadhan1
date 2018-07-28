import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MatSnackBar} from "@angular/material";
import {AuthGuardService} from "../auth/auth.service";
import {OperatorsService} from "../operators/operators-table/operators.service";
import {Observable} from "rxjs/index";

@Component({
  selector: 'fury-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.scss']
})
export class PasswordComponent implements OnInit {
  inputType = 'password';
  visible = false;
  form: FormGroup;

  constructor(private cd: ChangeDetectorRef,
              private fb: FormBuilder,
              private snackbar: MatSnackBar,
              private authService: AuthGuardService,
              private operatorsService: OperatorsService,)
  { }

  ngOnInit() {
    this.form = this.fb.group({
      currentPassword: ['', [Validators.required,  Validators.minLength(6), Validators.maxLength(64)]],
      newPassword: ['', [Validators.required,  Validators.minLength(6),   Validators.maxLength(64)]],
      confirmNewPassword: ['', [Validators.required,  Validators.minLength(6),   Validators.maxLength(64)]]
    });
  }

  showPassword() {
    this.inputType = 'text';
    this.visible = true;
    this.cd.markForCheck();
  }

  hidePassword() {
    this.inputType = 'password';
    this.visible = false;
    this.cd.markForCheck();
  }

  save() {

    var currentPassword =this.form.get('currentPassword').value;
    var newPassword = this.form.get('newPassword').value;
    var confirmNewPassword=  this.form.get('confirmNewPassword').value;
    if (newPassword !== confirmNewPassword) {
      this.snackbar.open('New password and confirm password are different. ' +
        '\nPlease adjust, then try again', 'Ok', {
        verticalPosition: 'top',
        horizontalPosition: 'end'
      });
    }
    else {
      const _id = this.authService.getLoggedInUserId();
      this.operatorsService.updatePassword(_id, currentPassword, newPassword).subscribe(
        data => {
          this.snackbar.open('Password successfully changed', 'Ok', {
            duration: 5000,
            verticalPosition: 'top',
            horizontalPosition: 'end'
          });
          this.form.reset();
        },
        error => {
          console.error("Error updating password: Error: "+ error.error);
          var message = 'Problem updating password. ';
          if (error.error !== null)
            message = message + error.error;
          this.snackbar.open(message, 'Ok', {
            verticalPosition: 'top',
            horizontalPosition: 'end'
          });
          return Observable.throw(error);
        }
      );
    }

  }
}
