
const BookInputSchema = `
type BookInput {
  title: String!
  author: Author!
  publicationYear: String!,
  genres: [String]
  rating: Float!
}
`

const BookSchema = `
type Book {
  id: Int!
  title: String!
  author: Author!
  publicationYear: String!,
  genres: [String]
  rating: Float!
}
`

const AuthorSchema = `
type Author {
  firstName: String
  lastName: String
}
`
const SearchSchema = `
  type Search {
    bookTitle: String
    author: Author
  }
`

const SchemaDefinition = `
  type Query {
    searchBook(searchParams: Search): [Book]
    getBookStateAt(bookId: Int, timestamp: Int): Book
    getLibraryStateAt(timestamp: Int): [Book]
  }

  type Mutation {
    login(email: String!, password: String!): String
    addBook(bookInput: BookInput!): Book
    updateBook(id: Int!, book: BookInput!): Book
    deleteBook (id: Int!): Int
  }
`
export {
  SchemaDefinition,
  BookInputSchema,
  BookSchema,
  AuthorSchema,
  SearchSchema
}
