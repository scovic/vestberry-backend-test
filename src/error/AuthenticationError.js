
export default class AuthenticationError extends Error {
  constructor (message) {
    super(message ?? 'Not authenticated')
  }
}
