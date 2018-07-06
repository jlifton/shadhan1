import {Component, Inject, OnInit} from '@angular/core';
import {OperatorDTO} from "../operator.data";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

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
      phone: [this.operatorDTO.phone, [Validators.required,  Validators.maxLength(64)]],
      email: [this.operatorDTO.email, [Validators.required, Validators.email,  Validators.maxLength(255)]],
      street: [this.operatorDTO.street, [ Validators.maxLength(255)]],
      city: [this.operatorDTO.city, [ Validators.maxLength(255)]],
      country: [this.operatorDTO.country, [ Validators.maxLength(255)]],
      username: [this.operatorDTO.username, [Validators.required, Validators.minLength(6)]],
      password: new FormControl({value: this.operatorDTO.password, disabled: !this.isNew}, [Validators.required, Validators.minLength(6), Validators.maxLength(64)]),
      notes: [this.operatorDTO.notes, [Validators.maxLength(512)]],
    });
  }

  save() {
    if (!this.isNew)
      this.form.value._id = this.operatorDTO._id;
    this.dialogRef.close(this.form.value);
  }
  close() {
    this.dialogRef.close();
  }

}
