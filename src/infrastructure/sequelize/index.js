import {Sequelize} from 'sequelize'

export const initSequelize = (config) => {
  return new Sequelize(
    config.database,
    config.username,
    config.password,
    {
      host: config.host,
      dialect: config.dialect
    }
  )
}
