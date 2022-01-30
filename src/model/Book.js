import {DataTypes} from 'sequelize'

export default (sequelize) => {
  const Book = sequelize.define('Book', {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    publicationYear: {
      type: DataTypes.CHAR(4),
      allowNull: false
    }
  }, {underscore: true})

  Book.hasOne(sequelize.models.Author, {foreignKey: 'author_id'})

  return Book
}
