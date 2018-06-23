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
      lastName: [this.singleDTO.identity.lastName, [Validators.required,  Validators.maxLength(64)]],
      firstName: [this.singleDTO.identity.firstName, [Validators.required,  Validators.maxLength(50)]],
      sex: [this.singleDTO.identity.sex, [Validators.required]],
      age: [this.singleDTO.identity.age, [Validators.required, Validators.min(16), Validators.max(120)]],
      maritalStatus: [this.singleDTO.identity.maritalStatus, [Validators.required]]

    });

    this.backgroundFormGroup = this.fb.group({
      hashkafa: [this.singleDTO.religioEthnic.hashkafa, [Validators.required]],
      ethnicity: [this.singleDTO.religioEthnic.ethnicity, [Validators.required]],
      primaryActivity: [this.singleDTO.religioEthnic.primaryActivity, [Validators.required]],
      occupation: [this.singleDTO.occupation, [Validators.required]],
      ethnicityAdditional: [this.singleDTO.religioEthnic.ethnicityAdditional, [Validators.maxLength(255)]],
      cohen: [this.singleDTO.religioEthnic.cohen, []],
      convert: [this.singleDTO.religioEthnic.convert, []]
    });

    this.residenceContactFormGroup = this.fb.group({
      city: [this.singleDTO.residence.city, [Validators.maxLength(128)]],
      country: [this.singleDTO.residence.country, [Validators.maxLength(128)]],
      name: [this.singleDTO.contact.name, [Validators.required]],
      relationship: [this.singleDTO.contact.relationship, [Validators.maxLength(128)]],
      primaryPhone: [this.singleDTO.contact.primaryPhone, [Validators.required]],
      secondaryPhone: [this.singleDTO.contact.secondaryPhone, []],
      email: [this.singleDTO.contact.email, [Validators.maxLength(128)]]
    });

    this.physicalFormGroup = this.fb.group({
      height: [this.singleDTO.physical.height, []],
      build: [this.singleDTO.physical.build, [Validators.maxLength(128)]],
      description: [this.singleDTO.physical.description, [Validators.maxLength(255)]],
      personalityRequirements: [this.singleDTO.personalityRequirements, [Validators.maxLength(255)]],
      specialNeeds: [this.singleDTO.specialNeeds, [Validators.maxLength(255)]],
      smoker: [this.singleDTO.physical.smoker, []]
    });

    this.sourceFormGroup = this.fb.group({
      name: [this.singleDTO.source.name, [Validators.maxLength(128)]],
      email: [this.singleDTO.source.email, [Validators.maxLength(128)]],
      phone: [this.singleDTO.source.phone, [Validators.maxLength(128)]],
      comments: [this.singleDTO.comments, [Validators.maxLength(512)]]
    });

  }

 submit() {
   this.singleDTO.identity.lastName = this.identityFormGroup.value.lastName;
   this.singleDTO.identity.firstName = this.identityFormGroup.value.firstName;
   this.singleDTO.identity.sex = this.identityFormGroup.value.sex;
   this.singleDTO.identity.age = this.identityFormGroup.value.age;
   this.singleDTO.identity.maritalStatus = this.identityFormGroup.value.maritalStatus;

   this.singleDTO.religioEthnic.hashkafa = this.backgroundFormGroup.value.hashkafa;
   this.singleDTO.religioEthnic.ethnicity = this.backgroundFormGroup.value.ethnicity;
   this.singleDTO.religioEthnic.primaryActivity = this.backgroundFormGroup.value.primaryActivity;
   this.singleDTO.occupation = this.backgroundFormGroup.value.occupation;
   this.singleDTO.religioEthnic.ethnicityAdditional = this.backgroundFormGroup.value.ethnicityAdditional;
   this.singleDTO.religioEthnic.cohen = this.backgroundFormGroup.value.cohen;
   this.singleDTO.religioEthnic.convert = this.backgroundFormGroup.value.convert;

   this.singleDTO.residence.city = this.residenceContactFormGroup.value.city;
   this.singleDTO.residence.country = this.residenceContactFormGroup.value.country;
   this.singleDTO.contact.name = this.residenceContactFormGroup.value.name;
   this.singleDTO.contact.relationship = this.residenceContactFormGroup.value.relationship;
   this.singleDTO.contact.primaryPhone = this.residenceContactFormGroup.value.primaryPhone;
   this.singleDTO.contact.secondaryPhone = this.residenceContactFormGroup.value.secondaryPhone;
   this.singleDTO.contact.email = this.residenceContactFormGroup.value.email;

   this.singleDTO.physical.height = this.physicalFormGroup.value.height;
   this.singleDTO.physical.build = this.physicalFormGroup.value.build;
   this.singleDTO.physical.description = this.physicalFormGroup.value.description;
   this.singleDTO.personalityRequirements = this.physicalFormGroup.value.personalityRequirements;
   this.singleDTO.specialNeeds = this.physicalFormGroup.value.specialNeeds;
   this.singleDTO.physical.smoker = this.physicalFormGroup.value.smoker;

   this.singleDTO.source.name = this.sourceFormGroup.value.name;
   this.singleDTO.source.email = this.sourceFormGroup.value.email;
   this.singleDTO.source.phone = this.sourceFormGroup.value.phone;
   this.singleDTO.comments = this.sourceFormGroup.value.comments;

   this.dialogRef.close(this.singleDTO);
  }
}
