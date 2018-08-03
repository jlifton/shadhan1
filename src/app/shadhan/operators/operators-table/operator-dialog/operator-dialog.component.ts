import {Component, Inject, OnInit} from '@angular/core';
import {OperatorDTO} from "../operator.data";
import {MAT_DIALOG_DATA, MatDialogRef, MatSnackBar} from "@angular/material";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthGuardService} from "../../../auth/auth.service";

@Component({
  selector: 'fury-operator-dialog',
  templateUrl: './operator-dialog.component.html',
  styleUrls: ['./operator-dialog.component.scss']
})
export class OperatorDialogComponent implements OnInit {
  form: FormGroup;
  operatorDTO: OperatorDTO;
  title: string;
  types: {};
  isNew = true;
  emailPattern: string = "[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}";
  commitLabel: string;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<OperatorDialogComponent>,
    private authGuardService: AuthGuardService,
    private snackbar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) operatorDTO) {
    this.operatorDTO = operatorDTO;
    if (this.operatorDTO.name !== '')
      this.isNew = false;
  }

  ngOnInit() {
    this.title = this.isNew ? 'New Operator' : 'Modify Operator';
    this.commitLabel =  this.isNew ? 'CREATE OPERATOR' : 'MODIFY OPERATOR';
    this.form = this.fb.group({
      title: [this.title, []],
      name: [this.operatorDTO.name, [Validators.required, Validators.minLength(5),  Validators.maxLength(50)]],
      type: [this.operatorDTO.type, [Validators.required]],
      phone: [this.operatorDTO.phone, [Validators.required,  Validators.pattern('^\\s*(?:\\+?\\d{1,3})?[- (]*\\d{2,3}(?:[- )]*\\d{3})?[- ]*\\d{4,7}(?: *[x/#]\\d+)?\\s*$')]],
      email: [this.operatorDTO.email, [Validators.required, Validators.email,  Validators.maxLength(255)]],
      street: [this.operatorDTO.street, [ Validators.maxLength(255)]],
      city: [this.operatorDTO.city, [ Validators.maxLength(255)]],
      country: [this.operatorDTO.country, [ Validators.maxLength(255)]],
      username: [this.operatorDTO.username, [Validators.required, Validators.minLength(6)]],
      password: new FormControl({value: this.isNew ? this.operatorDTO.password : '********', disabled: !this.isNew}, [Validators.required, Validators.minLength(6), Validators.maxLength(64)]),
      notes: [this.operatorDTO.notes, [Validators.maxLength(512)]],
    });
  }

  save() {
    const operatorType = this.authGuardService.getLoggedInType();
    if (operatorType !== 'ADMIN'){
      this.snackbar.open('This action is for Administrator operators only', 'Ok', {
        verticalPosition: 'top',
        horizontalPosition: 'end'
      });
      return;
    }
    if (!this.isNew)
      this.form.value._id = this.operatorDTO._id;
    this.dialogRef.close(this.form.value);
  }
  close() {
    this.dialogRef.close();
  }

}
