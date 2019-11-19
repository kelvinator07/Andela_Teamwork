export default class User {
  constructor(id, firstname, lastname, email, password, gender,
    jobrole, department, address, avatarurl, userrole) {
    this.id = id;
    this.firstname = firstname;
    this.lastname = lastname;
    this.email = email;
    this.password = password;
    this.gender = gender;
    this.jobrole = jobrole;
    this.department = department;
    this.address = address;
    this.avatarurl = avatarurl;
    this.userrole = userrole;
  }
}
