
export default (sequelize) => {
  const GenreBookMap = sequelize.define('GenreBookMap', {})

  GenreBookMap.hasOne(sequelize.models.Book, {foreignKey: 'book_id'})
  GenreBookMap.hasOne(sequelize.models.Genre, {foreignKey: 'genre_id'})

  return GenreBookMap
}
