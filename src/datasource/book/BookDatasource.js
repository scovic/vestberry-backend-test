import {Op} from 'sequelize'
import {IBookDatasource} from './IBookDatasource'

export default class BookDatasource extends IBookDatasource {
  constructor (bookModel, genreModel, authorModel, genreBookMapModel, bookAuditModel, ratingModel, sequelize) {
    super()
    this.bookModel = bookModel
    this.genreModel = genreModel
    this.authorModel = authorModel
    this.genreBookMapModel = genreBookMapModel
    this.bookAuditModel = bookAuditModel
    this.ratingModel = ratingModel
    this.sequelize = sequelize
  }

  async getBook (id) {
    const bookRow = await this.bookModel.findOne({where: {id: id}})
    if (bookRow) {
      throw new Error(`Book with id ${id} doesn't exist`)
    }

    return this._composeBookData(bookRow)
  }

  async getBookByTitle (title) {
    const bookRow = await this.bookModel.findOne({where: {title: title}})
    if (bookRow) {
      throw new Error(`Book with id ${id} doesn't exist`)
    }

    return this._composeBookData(bookRow)
  }

  async getBooksByAuthorName (firstName, lastName) {
    const authorRow = await this.authorModel.findOne({
      where: {
        firstName: firstName,
        lastName: lastName
      }
    })

    if (!authorRow) {
      throw new Error(`Author with name ${firstName} ${lastName} doesn't exists`)
    }

    const bookRows = await this.bookModel.findAll({where: {authorId: authorRow.id}})
    return Promise.all(bookRows.map(bookRow => this._composeBookData(bookRow)))
  }

  async addBook (book) {
    const result = await this.sequelize.transaction(async (t) => {
      const authorRow = await this._findAuthor(
        book.author.firstName,
        book.author.lastName
      )

      const bookRow = await this.bookModel.create({
        title: book.title,
        publicationYear: book.publicationYear,
        authorId: authorRow.id
      }, {transaction: t})

      await this._saveBookAudit(book, bookRow.id, authorRow.id, t)
      await this._mapGenresToBook(book, bookRow.id, t)

      return {
        id: bookRow.id,
        ...book,
        rating: book.rating || 0
      }
    })

    return result
  }

  async editBook (id, book) {
    const result = await this.sequelize.transaction(async (t) => {
      const bookRow = await this.bookModel.findOne({where: {id: id}})

      if (!bookRow) {
        throw new Error(`There is no book with given id - ${id}`)
      }

      const authorRow = await this._findAuthor(
        book.author.firstName,
        book.author.lastName
      )

      await bookRow.update({
        title: book.title,
        publicationYear: book.publicationYear,
        authorId: authorRow.id
      }, {transaction: t})

      await this.genreBookMapModel.destroy({where: {bookId: id}})
      await this._mapGenresToBook(book, id, t)
      await this._saveBookAudit(book, id, authorRow.id, t)
    })

    return result
  }

  async deleteBook (id) {
    return this.bookModel.destroy({where: {id: id}})
  }

  async _mapGenresToBook (book, bookId, transaction) {
    const genreRows = await this.genreModel.findAll({
      where: {
        [Op.or]: book.genres.map(genre => ({name: genre}))
      }
    })

    if (genreRows.length !== book.genres.length) {
      throw new Error('Some or all genres doesn\'t exist in system')
    }

    const genreBookMapData = genreRows.map(genre => ({bookId: bookId, genreId: genre.id}))
    await this.genreBookMapModel.bulkCreate(genreBookMapData, {transaction: transaction})
  }

  async _saveBookAudit (book, bookId, authorId, transaction) {
    await this.bookAuditModel.create({
      title: book.title,
      publicationYear: book.publicationYear,
      updateAt: new Date().getTime(),
      authorId: authorId,
      bookId: bookId
    }, {transaction: transaction})
  }

  async _findAuthor (firstName, lastName) {
    const authorRow = await this.authorModel.findOne({
      where: {
        firstName: firstName,
        lastName: lastName
      }
    })

    if (!authorRow) {
      throw new Error(
        `There is author with name ${firstName} ${lastName}`
      )
    }

    return authorRow
  }

  async _composeBookData (bookRow) {
    const genreBookRows = await this.genreBookMapModel.findAll({where: {bookId: bookRow.id}})
    const genreRows = await this.genreModel.findAll({
      where: {
        id: {
          [Op.or]: genreBookRows.map(genreBook => genreBook.genreId)
        }
      }
    })
    const authorRow = await this.authorModel.findOne({where: {id: bookRow.authorId}})
    const bookRating = await this.ratingModel.getBookRating(bookRow.id)

    const book = {
      id: bookRow.id,
      title: bookRow.title,
      publicationYear: bookRow.publicationYear,
      author: {firstName: authorRow.firstName, lastName: authorRow.lastName},
      genres: genreRows.map(genre => genre.name),
      rating: bookRating
    }

    return book
  }
}
