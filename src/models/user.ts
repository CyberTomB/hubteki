export default class User {
  name: string
  email: string

  constructor({ name, email }: User) {
    this.name = name
    this.email = email
  }
}
