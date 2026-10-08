export default class User {
  name: string
  email: string
  readonly feId: string

  constructor({ name, email }: User) {
    this.name = name
    this.email = email
    this.feId = crypto.randomUUID()
  }
}
