import jwt from 'jsonwebtoken'

export default class Jwt {
  constructor (secret) {
    this.secret = secret
  }

  sign (payload) {
    const token = jwt.sign(payload, this.secret)
    return {token}
  }

  verify (token) {
    try {
      jwt.verify(token, this.secret)
      return true
    } catch (err) {
      return false
    }
  }
}
