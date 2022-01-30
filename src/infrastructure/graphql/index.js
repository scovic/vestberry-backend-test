import {makeExecutableSchema} from 'graphql-tools'
import Resolver from './resolver/Resolver'
import {SchemaDefinition, AuthorSchema, BookSchema, BookInputSchema, SearchSchema} from './schema'

export const initGraphqlSchema = (bookService, authService) => {
  return makeExecutableSchema({
    typeDefs: [SchemaDefinition, AuthorSchema, BookSchema, BookInputSchema, SearchSchema],
    resolvers: {
      ...new Resolver(bookService, authService).getResolverObject()
    }
  })
}
