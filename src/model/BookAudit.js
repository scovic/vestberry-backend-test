import {DataTypes} from 'sequelize'

export default (sequelize) => {
  const BookAudit = sequelize.define('BookAudit', {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    publicationYear: {
      type: DataTypes.CHAR(4),
      allowNull: false
    },
    updatedAt: {
      type: DataTypes.NUMBER,
      allowNull: false,
    },
    action: {
      type: DataTypes.ENUM('edit', 'delete'),
      defaultValue: 'edit'
    }
  }, {underscore: true})

  BookAudit.hasOne(sequelize.models.Author, {foreignKey: 'author_id'})
  BookAudit.hasOne(sequelize.models.Book, {foreignKey: 'book_id'})

  return BookAudit
}
