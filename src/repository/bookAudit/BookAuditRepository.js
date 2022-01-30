import {IBookAuditRepository} from './IBookAuditRepository'
import {IBookAuditDatasource} from '../../datasource/bookAudit/IBookAuditDatasource'

export default class BookAuditRepository extends IBookAuditRepository {
  /**
   *
   * @param {IBookAuditDatasource} bookAuditDatasource
   */
  constructor (bookAuditDatasource) {
    super()
    this.bookAuditDatasource = bookAuditDatasource
  }

  async getAllBooksOldState (timestamp) {
    return this.bookAuditDatasource.getAllBooksAudit(timestamp)
  }

  async getBookOldState (bookId, timestamp) {
    return this.bookAuditDatasource.getBookAudit(bookId, timestamp)
  }
}
