import {DataTypes} from 'sequelize'

export default (sequelize) => {
  const Rating = sequelize.define('Rating', {
    value: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0.0,
      validate: {
        min: 0.0,
        max: 5.0
      }
    }
  })

  Rating.hasOne(sequelize.models.User, {foreignKey: 'user_id'})
  Rating.hasOne(sequelize.models.Book, {foreignKey: 'book_id'})

  Rating.getBookRating = async (bookId) => {
    const ratingRows = await sequelize.models.Rating.findAll({where: {book_id: bookId}})

    if (ratingRows.length === 0) {
      return 0
    }

    let rating = 0
    for (const rate of ratingRows) {
      rating += rate.value
    }

    return rating / ratingRows.length
  }

  return Rating
}
