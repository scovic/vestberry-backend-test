import MethodNotImplemented from '../../error/MethodNotImplementedError'

export class IBookAuditRepository {
  getBookOldState (bookId, timestamp) {
    throw new MethodNotImplemented('getBookOldState')
  }

  getAllBooksOldState (timestamp) {
    throw new MethodNotImplemented('getAllBooksOldState')
  }
}
