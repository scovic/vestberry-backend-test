import AuthenticationError from '../../../error/AuthenticationError'
import AuthService from '../../../service/AuthService'
import BookService from '../../../service/BookService'

export default class Resolver {
  /**
   * @param {BookService} bookService
   * @param {AuthService} authService
   */
  constructor (bookService, authService) {
    this.bookService = bookService
    this.authService = authService
  }

  getResolverObject () {
    return {
      Query: {
        searchBook: async ({bookTitle, author}) => {
          return this.bookService.getBook({title: bookTitle, author: author})
        },
        getBookStateAt: async (parent, args, context) => {
          await this._checkAuthentication(context)
          const {bookId, timestamp} = args
          return this.bookService.getBookOldState(bookId, timestamp)
        },
        getLibraryStateAt: async (parent, args, context, info) => {
          await this._checkAuthentication(context)
          const {timestamp} = args
          return this.bookService.getLibraryOldState(timestamp)
        }
      },
      Mutation: {
        login: async (email, password) => {
          const {token} = await this.authService.login(email, password)
          return token
        },
        addBook: async (parent, args, context) => {
          await this._checkAuthentication(context)
          const {book} = args
          return this.bookService.addBook(book)
        },
        updateBook: async (parent, args, context) => {
          await this._checkAuthentication(context)
          const {id, book} = args
          return this.bookService.editBook(id, book)
        },
        deleteBook: async (parent, args, context) => {
          await this._checkAuthentication(context)
          const {id} = args
          return this.bookService.deleteBook(id)
        }
      }
    }
  }

  async _checkAuthentication (context) {
    const token = context.authorization

    if (!token) {
      throw new AuthenticationError()
    }

    const isTokenValid = await this.authService.verify(token)
    if (!isTokenValid) {
      throw new AuthenticationError()
    }
  }
}
