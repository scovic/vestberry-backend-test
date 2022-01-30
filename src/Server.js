import express from 'express'
import {graphqlHTTP} from 'express-graphql'

import {initSequelize} from './infrastructure/sequelize'
import {initGraphqlSchema} from './infrastructure/graphql'
import {defineModels} from './model'

import AuthRepository from './repository/auth/AuthRepository'
import AuthDatasource from './datasource/auth/AuthDatasource'
import Jwt from './infrastructure/jwt/Jwt'

import BookRepository from './repository/book/BookRepository'
import BookDatasource from './datasource/book/BookDatasource'

import BookAuditRepository from './repository/bookAudit/BookAuditRepository'
import BookAuditDatasource from './datasource/bookAudit/BookAuditDatasource'
import BookService from './service/BookService'
import AuthService from './service/AuthService'

export default class Server {
  constructor (config) {
    this.config = config
    this.app = null
  }

  init () {
    const sequelize = initSequelize(this.config.db)
    const models = defineModels(sequelize)

    const authRepository = new AuthRepository(
      new AuthDatasource(new Jwt(this.config.jwt.secret))
    )

    const bookDatasource = new BookDatasource(
      models.Book,
      models.Genre,
      models.Author,
      models.GenreBookMap,
      models.BookAudit,
      models.Rating,
      sequelize
    )
    const bookRepository = new BookRepository(bookDatasource)

    const bookAuditDatasource = new BookAuditDatasource(
      models.BookAudit,
      models.Book,
      models.GenreBookMap,
      models.Genre,
      models.Author,
      models.Rating
    )
    const bookAuditRepository = new BookAuditRepository(bookAuditDatasource)

    const bookService = new BookService(bookRepository, bookAuditRepository)
    const authService = new AuthService(authRepository)

    const graphSchema = initGraphqlSchema(bookService, authService)

    const app = express()
    app.use('/graphql', graphqlHTTP(async (req, res) => {
      return {
        schema: graphSchema,
        graphiql: true,
        context: {
          authorization: req.headers.authorization
        }
      }
    }))

    this.app = app
  }

  start () {
    if (!this.app) {
      throw new Error('Init the server first!')
    }

    const {port, host} = this.config.server

    this.app.listen(port, host, () => (
      console.debug(`Server is running at http://${host}:${port}`)
    ))
  }
}
