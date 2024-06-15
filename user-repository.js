import DBLocal from 'db-local'
const { Schema } = new DBLocal({ path: './db' })

const User = Schema('User', {
  _id: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true }
})

export class UserRepository {
  static create ({ username, password }) {
    if (typeof username !== 'string') throw new Error('Username must be string.')
    if (username.length < 3) throw new Error('Username must be at least 3 characters long.')
    if (typeof password !== 'string') throw new Error('Password must be string.')
    if (password.length < 6) throw new Error('Password must be at least 6 characters long.')
    const user = User.findOne({ username })
    if (user) throw new Error('Username already exists')

    const id = crypto.randomUUID()

    User.create({
      _id: id,
      username,
      password
    }).save()

    return id
  }

  static login ({ username, password }) {}
}
