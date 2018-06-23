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
    });

    this.sourceFormGroup = this.fb.group({
      name: [this.singleDTO.source.name, []],
      email: [this.singleDTO.source.email, []],
      phone: [this.singleDTO.source.phone, []],
      comments: [this.singleDTO.comments, []]
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
   this.singleDTO.physical.smoker = this.physicalFormGroup.value.smoker;

   this.singleDTO.source.name = this.sourceFormGroup.value.name;
   this.singleDTO.source.email = this.sourceFormGroup.value.email;
   this.singleDTO.source.phone = this.sourceFormGroup.value.phone;
   this.singleDTO.comments = this.sourceFormGroup.value.comments;

   //let formValues: Array<Object> = [this.identityFormGroup.value,
   //   this.backgroundFormGroup.value,
   //   this.residenceContactFormGroup.value,
   //   this.physicalFormGroup.value,
   //   this.sourceFormGroup.value];

  // if (!this.isNew)
  //   this.form.value._id = this.singleDTO._id;
  // this.dialogRef.close(this.form.value);

   this.dialogRef.close(this.singleDTO);
  }
}
