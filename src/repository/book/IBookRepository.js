import MethodNotImplemented from '../../error/MethodNotImplementedError'

/**
 * @typedef BookData
 * @property {string} title
 * @property {{ firstName: string, lastName: string }} author
 * @property {string} publicationYear
 * @property {string[]} genres
 * @property {number} rating
 */

export class IBookRepository {
  getBookByTitle (title) {
    throw new MethodNotImplemented('getBookByTitle')
  }

  getBooksByAuthorName (firstName, lastName) {
    throw new MethodNotImplemented('getBooksByAuthorName')
  }

  /**
   * @param {BookData} book
   */
  addBook (book) {
    throw new MethodNotImplemented('addBook')
  }

  /**
   * @param {number} id
   * @param {BookData} book
   */
  editBook (id, book) {
    throw new MethodNotImplemented('addBook')
  }

  /**
   * @param {number} id
   */
  deleteBook (id) {
    throw new MethodNotImplemented('deleteBook')
  }

  /**
   * @param {number} id
   * @param {number} timestamp
   */
  getBookOldState (bookId, timestamp) {
    throw new MethodNotImplemented('getBookOldState')
  }

  /**
  * @param {number} timestamp
  */
  getLibraryOldState (timestamp) {
    throw new MethodNotImplemented('getBookOldState')
  }
}
