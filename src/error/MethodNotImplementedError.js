
export default class MethodNotImplemented extends Error {
  constructor (methodName) {
    super(`${methodName} not implemented!`)
  }
}
