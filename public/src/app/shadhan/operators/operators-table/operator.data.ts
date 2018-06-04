export class OperatorDTO {
  name: string;
  type: string;
  phone: string;
  email: string;
  street: string;
  city: string;
  country: string;
  username: string;
  password: string;
  _id: string;

  constructor(content: any) {
    this.name = '';
    this.type = '';
    this.phone = '';
    this.email = '';
    this.street = '';
    this.city = '';
    this.country = '';
    this.username = '';
    this.password = '';
    this._id = '';

    if (content !== undefined) {
      this.name = content.name;
      this.type = content.type;
      this.phone = content, this.phone;
      this.email = content.email;
      this.street = content.street;
      this.city = content.city;
      this.country = content.country;
      this.username = content.username;
      this.password = content.password;
      this._id = content._id;
    }
  }

  toString(): string {
    return '\n name = ' + this.name +
      '\n type = ' + this.type +
      '\n phone = ' + this.phone +
      '\n email = ' + this.email +
      '\n street = ' + this.street +
      '\n city = ' + this.city +
      '\n country = ' + this.country +
      '\n username = ' + this.username +
      '\n password = ' + this.password +
      '\n _id = ' + this._id;
  }
}
