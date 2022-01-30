import {IBookRepository} from '../repository/book/IBookRepository'
import {IBookAuditRepository} from '../repository/bookAudit/IBookAuditRepository'

class BookService {
  /**
   * @param {IBookRepository} bookRepository
   * @param {IBookAuditRepository} bookAuditRepository
   */
  constructor (bookRepository, bookAuditRepository) {
    this.bookRepository = bookRepository
    this.bookAuditRepository = bookAuditRepository
  }

  async getBook ({title, author}) {
    const book = await this.bookRepository.getBookByTitle(title)

    if (!book) {
      return this.bookRepository.getBooksByAuthorName(author.firstName, author.lastName)
    }

    return book
  }

  addBook (book) {
    return this.bookRepository.addBook(book)
  }

  editBook (id, book) {
    return this.bookRepository.editBook(id, book)
  }

  deleteBook (id) {
    return this.bookRepository.deleteBook(id)
  }

  getBookOldState (bookId, timestamp) {
    return this.bookAuditRepository.getBookOldState(bookId, timestamp)
  }

  getLibraryOldState (timestamp) {
    return this.bookAuditRepository.getAllBooksOldState(timestamp)
  }
}

export default BookService
