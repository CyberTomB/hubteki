export default class User {
  name: string
  email: string
  id: string

  constructor({ name, email, id }: User) {
    this.name = name
    this.email = email
    this.id = id
  }
}
