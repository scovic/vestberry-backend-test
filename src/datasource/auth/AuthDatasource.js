import Jwt from '../../infrastructure/jwt/Jwt'
import {IAuthDatasource} from './IAuthDatasource'

export default class AuthDatasource extends IAuthDatasource {
  /**
   * @param {Jwt} jwt
   */
  constructor (jwt) {
    super()
    this.jwt = jwt
  }

  login (email, password) {
    return this.jwt.sign({email, password})
  }

  verify (token) {
    return this.jwt.verify(token)
  }
}
