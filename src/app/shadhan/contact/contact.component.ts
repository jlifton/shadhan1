import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {SystemService} from '../system/system.service';
import {Observable} from 'rxjs';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'fury-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  contactFormGroup: FormGroup;
  name = '';
  email = '';
  phone = '';
  message = '';

  constructor(private fb: FormBuilder,
              private systemService: SystemService,
              private snackbar: MatSnackBar) { }

  ngOnInit() {
    this.contactFormGroup = this.fb.group({
      name: [this.name, [Validators.required,  Validators.maxLength(64)]],
      email: [this.email,[Validators.email, Validators.maxLength(128)]],
      phone: [this.phone, [Validators.required, Validators.pattern('^\\s*(?:\\+?\\d{1,3})?[- (]*\\d{2,3}(?:[- )]*\\d{3})?[- ]*\\d{4,7}(?: *[x/#]\\d+)?\\s*$')]],
      message: [this.message,  [Validators.required, Validators.maxLength(512)]]

    });
  }

  clearAndPrompt() {
    let name = this.name;
    this.name = '';
    this.email = '';
    this.phone = '';
    this.message = '';
    this.contactFormGroup.reset();
    this.snackbar.open(name + ' - Thank you for your inquiry ! We will be in touch with you soon', null, {
      duration: 7000,
      verticalPosition: 'top',
      horizontalPosition: 'end'
    });
  }

  submitMessage() {
    this.name = this.contactFormGroup.value.name.trim();
    this.email = this.contactFormGroup.value.email.trim();
    this.phone = this.contactFormGroup.value.phone.trim();
    this.message = this.contactFormGroup.value.message.trim();

    this.systemService.sendContactMessage(this.name, this.phone, this.email, this.message).subscribe(
      data => {
        this.clearAndPrompt();
      },
      error => {
        if (error.status !== 200) {
          console.error("Error sending contact message");
          let errMsg = 'Problem send contact message';
          if (error.error !== undefined)
            errMsg = errMsg + '. Details: ' + error.error;
          this.snackbar.open(errMsg, 'Ok', {
            verticalPosition: 'top',
            horizontalPosition: 'end'
          });
          return Observable.throw(error);
        }
        else {
          this.clearAndPrompt();
        }
      }
    );
  }

}
