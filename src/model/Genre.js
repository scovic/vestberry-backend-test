import {DataTypes} from 'sequelize'

export default (sequelize) => {
  const Genre = sequelize.define('Genre', {
    name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    }
  })

  return Genre
}
