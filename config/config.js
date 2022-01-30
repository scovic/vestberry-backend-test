import dotenv from 'dotenv'
dotenv.config()

const port = process.env.PORT || 8000
const host = process.env.HOST || 'localhost'

const database = process.env.DB
const username = process.env.DB_USERNAME
const password = process.env.DB_PASSWORD
const dialect = process.env.DB_DIALECT
const dbHost = process.env.DB_HOST

const secret = process.env.SECRET || ''

export default {
  server: {
    port: port,
    host: host
  },
  db: {
    database: database,
    username: username,
    password: password,
    dialect: dialect,
    host: dbHost
  },
  jwt: {
    secret: secret
  }
}
