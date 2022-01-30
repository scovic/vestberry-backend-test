import {IAuthDatasource} from '../../datasource/auth/IAuthDatasource'
import {IAuthRepository} from './IAuthRepository'

export default class AuthRepository extends IAuthRepository {
  /**
   * @param {IAuthDatasource} authDatasource
   */
  constructor (authDatasource) {
    super()
    this.authDatasource = authDatasource
  }

  /**
   * @param {string} email
   * @param {string} password
   */
  async login (email, password) {
    return this.authDatasource.login(email, password)
  }

  /**
   * @param {string} token
   */
  verify (token) {
    return this.authDatasource.verify(token)
  }
}
