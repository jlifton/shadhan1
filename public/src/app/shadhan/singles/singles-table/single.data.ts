export class SingleDTO {
  content: any;
  identity: {
    firstName: string;
    lastName: string;
    sex: string;
    age: number;
    maritalStatus: string;
  };
  religioEthnic: {
    hashkafa:  string;
    ethnicity:  string;
    ethnicityAdditional:  string;
    convert: boolean,
    cohen: boolean,
    primaryActivity: string;
  };
  residence: {
    city: string;
    country:  string;
  };
  physical: {
    smoker: boolean;
    height: number;
    build: string;
    description: string;
  };
  contact: {
    name:  string;
    relationship: string;
    primaryPhone: string;
    secondaryPhone: string;
    email: string;
  };
  source: {
    name: string;
    email: string;
    phone: string;
  };
  visible: boolean;
  _id:  string;
  occupation:  string;
  specialNeeds:  string;
  personalityRequirements:  string;
  pastEducation:  string;
  comments:  string;
  dateEntered:  string;

  constructor(content: any) {
    this.identity = {
      firstName: '',
      lastName: '',
      sex: '',
      age: 0,
      maritalStatus: ''
    };

    this.religioEthnic = {
      hashkafa: '',
      ethnicity: '',
      ethnicityAdditional: '',
      convert: false,
      cohen: false,
      primaryActivity: ''
    };

    this.residence = {
      city: '',
      country: 'Israel'
    };
    this.physical = {
      smoker: false,
      height: 0,
      build: '',
      description: ''
    };
    this.contact = {
      name: '',
      relationship: '',
      primaryPhone: '',
      secondaryPhone: '',
      email: ''
    };
    this.source = {
      name: '',
      email: '',
      phone: ''
    };
    this.visible = true;
    this._id = '';
    this.occupation = '';
    this.specialNeeds = '';
    this.personalityRequirements = '';
    this.pastEducation = '';
    this.comments = '';
    this.dateEntered = '';

    if ((content !== undefined) &&
      (content !== null)) {
      this.identity = {
        firstName: content.identity.firstName,
        lastName: content.identity.lastName,
        sex: content.identity.sex,
        age: content.identity.age,
        maritalStatus: content.identity.maritalStatus
      };

      this.religioEthnic = {
        hashkafa: content.religioEthnic.hashkafa,
        ethnicity: content.religioEthnic.ethnicity,
        ethnicityAdditional: content.religioEthnic.ethnicityAdditional,
        convert: content.religioEthnic.convert,
        cohen: content.religioEthnic.cohen,
        primaryActivity: content.religioEthnic.primaryActivity
      };
      this.residence = {
        city: content.residence.city,
        country: content.residence.country
      };
      this.physical = {
        smoker: content.physical.smoker,
        height: content.physical.height,
        build: content.physical.build,
        description: content.physical.description
      };
      this.contact = {
        name: content.contact.name,
        relationship: content.contact.relationship,
        primaryPhone: content.contact.primaryPhone,
        secondaryPhone: content.contact.secondaryPhone,
        email: content.contact.email
      };
      this.source = {
        name: content.source.name,
        email: content.source.email,
        phone: content.source.phone
      };


      this.visible = content.visible;
      this._id = content._id;
      this.occupation = content.occupation;
      this.specialNeeds = content.specialNeeds;
      this.personalityRequirements = content.personalityRequirements;
      this.pastEducation = content.pastEducation;
      this.comments = content.comments;
      this.dateEntered = content.dateEntered;
    }
  }

  toString(): string {
   /**return '\n name = ' + this.name +
      '\n type = ' + this.type +
      '\n phone = ' + this.phone +
      '\n email = ' + this.email +
      '\n street = ' + this.street +
      '\n city = ' + this.city +
      '\n country = ' + this.country +
      '\n username = ' + this.username +
      '\n password = ' + this.password +
      '\n notes = ' + this.notes +
      '\n _id = ' + this._id;**/
   return '';
  }

  cloned(): SingleDTO {
    const clonedSingleDTO = new  SingleDTO(this.content);
    return clonedSingleDTO;
  }
}
