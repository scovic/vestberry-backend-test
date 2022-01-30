import MethodNotImplemented from '../../error/MethodNotImplementedError'

export class IAuthRepository {
  login (email, password) {
    throw new MethodNotImplemented('login')
  }

  verify (token) {
    throw new MethodNotImplemented('verify')
  }
}
