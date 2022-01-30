import MethodNotImplemented from '../../error/MethodNotImplementedError'

export class IBookAuditDatasource {
  getBookAudit (bookId, timestamp) {
    throw new MethodNotImplemented('getBookAudit')
  }

  getAllBooksAudit (timestmap) {
    throw new MethodNotImplemented('getAllBooksAudit')
  }
}
