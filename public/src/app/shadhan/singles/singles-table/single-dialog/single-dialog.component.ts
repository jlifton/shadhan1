import {ChangeDetectorRef, Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
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
  dateUpdate: string;

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
    this.dateUpdate = '';
    this.title = this.isNew ? 'New Single' : 'Modify Single';
    this.commitLabel =  this.isNew ? 'CREATE SINGLE' : 'MODIFY SINGLE';
    if (!this.isNew)
      this.dateUpdate = this.toDateTimeString();
    this.identityFormGroup = this.fb.group({
      lastName: [this.singleDTO.identity.lastName, [Validators.required,  Validators.maxLength(64)]],
      firstName: [this.singleDTO.identity.firstName, [Validators.required,  Validators.maxLength(50)]],
      sex: [this.singleDTO.identity.sex, [Validators.required]],
      age: [this.singleDTO.identity.age, [Validators.required, Validators.min(16), Validators.max(120)]],
      maritalStatus: [this.singleDTO.identity.maritalStatus, [Validators.required]],
      updated:  [this.singleDTO.updated, []]
    });

    this.backgroundFormGroup = this.fb.group({
      hashkafa: [this.singleDTO.religioEthnic.hashkafa, [Validators.required]],
      ethnicity: [this.singleDTO.religioEthnic.ethnicity, [Validators.required]],
      primaryActivity: [this.singleDTO.religioEthnic.primaryActivity, [Validators.required]],
      occupation: [this.singleDTO.occupation, [Validators.required]],
      pastEducation: [this.singleDTO.pastEducation, [Validators.maxLength(255)]],
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
   this.singleDTO.identity.lastName = this.identityFormGroup.value.lastName.trim();
   this.singleDTO.identity.firstName = this.identityFormGroup.value.firstName.trim();
   this.singleDTO.identity.sex = this.identityFormGroup.value.sex;
   this.singleDTO.identity.age = this.identityFormGroup.value.age;
   this.singleDTO.identity.maritalStatus = this.identityFormGroup.value.maritalStatus;

   this.singleDTO.religioEthnic.hashkafa = this.backgroundFormGroup.value.hashkafa;
   this.singleDTO.religioEthnic.ethnicity = this.backgroundFormGroup.value.ethnicity;
   this.singleDTO.religioEthnic.primaryActivity = this.backgroundFormGroup.value.primaryActivity;
   this.singleDTO.occupation = this.backgroundFormGroup.value.occupation.trim();
   this.singleDTO.pastEducation = this.backgroundFormGroup.value.pastEducation.trim();
   this.singleDTO.religioEthnic.ethnicityAdditional = this.backgroundFormGroup.value.ethnicityAdditional.trim();
   this.singleDTO.religioEthnic.cohen = this.backgroundFormGroup.value.cohen;
   this.singleDTO.religioEthnic.convert = this.backgroundFormGroup.value.convert;

   this.singleDTO.residence.city = this.residenceContactFormGroup.value.city.trim();
   this.singleDTO.residence.country = this.residenceContactFormGroup.value.country.trim();
   this.singleDTO.contact.name = this.residenceContactFormGroup.value.name.trim();
   this.singleDTO.contact.relationship = this.residenceContactFormGroup.value.relationship.trim();
   this.singleDTO.contact.primaryPhone = this.residenceContactFormGroup.value.primaryPhone.trim();
   this.singleDTO.contact.secondaryPhone = this.residenceContactFormGroup.value.secondaryPhone.trim();
   this.singleDTO.contact.email = this.residenceContactFormGroup.value.email.trim();

   this.singleDTO.physical.height = this.physicalFormGroup.value.height;
   this.singleDTO.physical.build = this.physicalFormGroup.value.build.trim();
   this.singleDTO.physical.description = this.physicalFormGroup.value.description.trim();
   this.singleDTO.personalityRequirements = this.physicalFormGroup.value.personalityRequirements.trim();
   this.singleDTO.specialNeeds = this.physicalFormGroup.value.specialNeeds.trim();
   this.singleDTO.physical.smoker = this.physicalFormGroup.value.smoker;

   this.singleDTO.source.name = this.sourceFormGroup.value.name.trim();
   this.singleDTO.source.email = this.sourceFormGroup.value.email.trim();
   this.singleDTO.source.phone = this.sourceFormGroup.value.phone.trim();
   this.singleDTO.comments = this.sourceFormGroup.value.comments.trim();

   this.dialogRef.close(this.singleDTO);
  }

  toDateTimeString() {
    let d: Date;
    d = new Date(this.singleDTO.updated);
    var datestring = ("0" + d.getDate()).slice(-2) + "-" + ("0"+(d.getMonth()+1)).slice(-2) + "-" +
      d.getFullYear() + " " + ("0" + d.getHours()).slice(-2) + ":" + ("0" + d.getMinutes()).slice(-2);
    return datestring;
  }
}
