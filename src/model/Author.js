import {DataTypes} from 'sequelize'

export default (sequelize) => {
  const Author = sequelize.define('Author', {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  }, {underscore: true})

  return Author
}
