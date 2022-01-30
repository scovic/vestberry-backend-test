import MethodNotImplemented from '../../error/MethodNotImplementedError'

export class IBookDatasource {
  getBook (id) {
    throw new MethodNotImplemented('getBook')
  }

  getBookByTitle (title) {
    throw new MethodNotImplemented('getBookByTitle')
  }

  getBooksByAuthorName (firstName, lastName) {
    throw new MethodNotImplemented('getBooksByAuthorName')
  }

  addBook (book) {
    throw new MethodNotImplemented('addBook')
  }

  editBook (id, book) {
    throw new MethodNotImplemented('editBook')
  }

  deleteBook (id) {
    throw new MethodNotImplemented('deleteBook')
  }
}
