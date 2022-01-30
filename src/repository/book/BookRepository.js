import {IBookRepository, BookData} from './IBookRepository'
import {IBookDatasource} from '../../datasource/book/IBookDatasource'

export default class BookRepository extends IBookRepository {
  /**
   *
   * @param {IBookDatasource} bookDatasource
   */
  constructor (bookDatasource) {
    super()
    this.bookDatasource = bookDatasource
  }

  /**
   * @param {string} title
   */
  async getBookByTitle (title) {
    return this.bookDatasource.getBookByTitle(title)
  }

  /**
   *
   * @param {string} firstName
   * @param {string} lastName
   */
  async getBooksByAuthorName (firstName, lastName) {
    return this.bookDatasource.getBooksByAuthorName(firstName, lastName)
  }

  /**
   * @param {BookData} book
   */
  async addBook (book) {
    try {
      return this.bookDatasource.addBook(book)
    } catch (err) {
      throw new Error(`Error while adding new book - ${err.message}`)
    }
  }

  async deleteBook (id) {
    try {
      return this.bookDatasource.deleteBook(id)
    } catch (err) {
      throw new Error(`Error while deleting book with id ${id} - ${err.message}`)
    }
  }

  async editBook (id, book) {
    try {
      return this.bookDatasource.editBook(id, book)
    } catch (err) {
      throw new Error(`Error while editing the book with id ${id} - ${err.message}`)
    }
  }
}
