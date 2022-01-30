import defineAuthor from './Author'
import defineBook from './Book'
import defineBookAudit from './BookAudit'
import defineGenre from './Genre'
import defineGenreBookMap from './GenreBookMap'
import defineRating from './Rating'
import defineUser from './User'

export const defineModels = (sequelize) => {
  return {
    Author: defineAuthor(sequelize),
    Book: defineBook(sequelize),
    BookAudit: defineBookAudit(sequelize),
    Genre: defineGenre(sequelize),
    GenreBookMap: defineGenreBookMap(sequelize),
    User: defineUser(sequelize),
    Rating: defineRating(sequelize)
  }
}
