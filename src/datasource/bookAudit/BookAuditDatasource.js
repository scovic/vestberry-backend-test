import {Sequelize, Op} from 'sequelize'
import {IBookAuditDatasource} from './IBookAuditDatasource'

export default class BookAuditDatasource extends IBookAuditDatasource {
  constructor (bookAuditModel, bookModel, genreBookMapModel, genreModel, authorModel, ratingModel) {
    super()
    this.bookAuditModel = bookAuditModel
    this.bookModel = bookModel
    this.genreBookMapModel = genreBookMapModel
    this.genreModel = genreModel
    this.authorModel = authorModel
    this.ratingModel = ratingModel
  }

  async getAllBooksAudit (timestamp) {
    const bookAudits = await this.bookAuditModel.findAll({
      attributes: [
        [Sequelize.fn('DISTINCT', Sequelize.col('book_id')), 'bookId']
      ],
    })

    return Promise.all(bookAudits.map(bookAudit => this._getBookAudit(bookAudit.bookId, timestamp)))
  }

  async getBookAudit (bookId, timestamp) {
    return this._getBookAudit(bookId, timestamp)
  }

  async _getBookAudit (bookId, timestamp) {
    const bookAuditRow = await this.bookAuditModel.findOne({
      where: {
        updatedAt: {
          $lt: timestamp
        },
        bookId: bookId
      }
    })

    return this._composeBookData(bookAuditRow)
  }

  async _composeBookData (bookAuditRow) {
    const bookRow = await this.bookModel.findOne({where: {id: bookAuditRow.bookId}})
    const genreBookRows = await this.genreBookMapModel.findAll({where: {bookId: bookRow.id}})
    const genreRows = await this.genreModel.findAll({
      where: {
        id: {
          [Op.or]: genreBookRows.map(genreBook => genreBook.genreId)
        }
      }
    })
    const authorRow = await this.authorModel.findOne({where: {id: bookAuditRow.authorId}})
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
