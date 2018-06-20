import {ChangeDetectorRef, Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef, MatSnackBar} from "@angular/material";
import {SingleDTO} from "../single.data";

@Component({
  selector: 'fury-single-dialog',
  templateUrl: './single-dialog.component.html',
  styleUrls: ['./single-dialog.component.scss']
})
export class SingleDialogComponent implements OnInit {
  identityFormGroup: FormGroup;
  backgroundFormGroup: FormGroup;
  residenceContactFormGroup: FormGroup;
  physicalFormGroup: FormGroup;
  sourceFormGroup: FormGroup;
  singleDTO: SingleDTO;
  title: string;
  isNew = true;
  commitLabel: string;

  constructor(private fb: FormBuilder,
              private cd: ChangeDetectorRef,
              private snackbar: MatSnackBar,
              private dialogRef: MatDialogRef<SingleDialogComponent>,
              @Inject(MAT_DIALOG_DATA) singleDTO) {
    this.singleDTO = singleDTO;
    if (this.singleDTO.identity.lastName !== '')
      this.isNew = false;
  }
  ngOnInit() {
    this.title = this.isNew ? 'New Single' : 'Modify Single';
    this.commitLabel =  this.isNew ? 'CREATE SINGLE' : 'MODIFY SINGLE';
    this.identityFormGroup = this.fb.group({
      lastName: [this.singleDTO.identity.lastName, [Validators.required, Validators.minLength(5),  Validators.maxLength(50)]],
      firstName: [this.singleDTO.identity.firstName, [Validators.required, Validators.minLength(5),  Validators.maxLength(50)]],
      sex: [this.singleDTO.identity.sex, [Validators.required]],
      age: [this.singleDTO.identity.age, [Validators.required, Validators.min(16), Validators.max(120)]],
      maritalStatus: [this.singleDTO.identity.maritalStatus, [Validators.required]]
      //name: [null, Validators.required],
      //email: [null, Validators.required],
      //phonePrefix: [this.phonePrefixOptions[3]],
      //phone: [],
    });

    this.backgroundFormGroup = this.fb.group({
      hashkafa: [this.singleDTO.religioEthnic.hashkafa, [Validators.required]],
      ethnicity: [this.singleDTO.religioEthnic.ethnicity, [Validators.required]],
      primaryActivity: [this.singleDTO.religioEthnic.primaryActivity, [Validators.required]],
      occupation: [this.singleDTO.occupation, [Validators.required]],
      ethnicityAdditional: [this.singleDTO.religioEthnic.ethnicityAdditional, []],
      cohen: [this.singleDTO.religioEthnic.cohen, []],
      convert: [this.singleDTO.religioEthnic.convert, []]
    });

    this.residenceContactFormGroup = this.fb.group({
      city: [this.singleDTO.residence.city, []],
      country: [this.singleDTO.residence.country, []],
      name: [this.singleDTO.contact.name, [Validators.required]],
      relationship: [this.singleDTO.contact.relationship, []],
      primaryPhone: [this.singleDTO.contact.primaryPhone, [Validators.required]],
      secondaryPhone: [this.singleDTO.contact.secondaryPhone, []],
      email: [this.singleDTO.contact.email, []]
    });


    this.physicalFormGroup = this.fb.group({
      height: [this.singleDTO.physical.height, []],
      build: [this.singleDTO.physical.build, []],
      description: [this.singleDTO.physical.description, []],
      personalityRequirements: [this.singleDTO.personalityRequirements, []],
      smoker: [this.singleDTO.physical.smoker, []]
      //name: [null, Validators.required],
      //email: [null, Validators.required],
      //phonePrefix: [this.phonePrefixOptions[3]],
      //phone: [],
    });

    this.sourceFormGroup = this.fb.group({
      name: [this.singleDTO.source.name, []],
      email: [this.singleDTO.source.email, []],
      phone: [this.singleDTO.source.phone, []],
      comments: [this.singleDTO.comments, []]
    });

  }

 submit() {
    const x = this.isNew;
  // if (!this.isNew)
  //   this.form.value._id = this.singleDTO._id;
  // this.dialogRef.close(this.form.value);

  }
}
