import {IAuthRepository} from '../repository/auth/IAuthRepository'

class AuthService {
  /**
   *
   * @param {IAuthRepository} authRepository
   */
  constructor (authRepository) {
    this.authRepository = authRepository
  }

  login (email, password) {
    return this.authRepository.login(email, password)
  }

  verify (token) {
    return this.authRepository.verify(token)
  }
}

export default AuthService
