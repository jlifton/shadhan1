import {Component, Inject, OnInit} from '@angular/core';
import {OperatorDTO} from "../operator.data";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {FormBuilder, FormGroup} from "@angular/forms";

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

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<OperatorDialogComponent>,
    @Inject(MAT_DIALOG_DATA) operatorDTO) {
    this.operatorDTO = operatorDTO;
  }

  ngOnInit() {
    this.title = this.operatorDTO.name === '' ? 'New Operator': 'Modify Operator';
    this.form = this.fb.group({
      title: [this.title, []],
      name: [this.operatorDTO.name, []],
      type: [this.operatorDTO.type, []],
      phone: [this.operatorDTO.phone, []],
      email: [this.operatorDTO.email, []],
      street: [this.operatorDTO.street, []],
      city: [this.operatorDTO.city, []],
      country: [this.operatorDTO.country, []],
      username: [this.operatorDTO.username, []],
      password: [this.operatorDTO.password, []]
    });
  }
  save() {
    this.dialogRef.close(this.form.value);
  }
  close() {
    this.dialogRef.close();
  }

}
