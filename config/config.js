require ('dotenv').config()

module.exports = {
  "development": {
    "username": process.env.DB_USER_DEV,
    "password": process.env.DB_PSW_DEV,
    "database": process.env.DB_NAME_DEV,
    "host": process.env.DB_HOST_DEV,
    "port": process.env.DB_PORT_DEV,
    "dialect": process.env.DB_DIALECT,
    "timezone": process.env.DB_TIMEZONE || "Asia/Jakarta"
  },
  "production": {
    "username": process.env.DB_USER_PROD,
    "password": process.env.DB_PSW_PROD,
    "database": process.env.DB_NAME_PROD,
    "host": process.env.DB_HOST_PROD,
    "port": process.env.DB_PORT_PROD,
    "dialect": process.env.DB_DIALECT,
    "timezone": process.env.DB_TIMEZONE || "Asia/Jakarta"
  },
  TOKEN_SECRET_KEY: process.env.TOKEN || 'kmzway87aa'
}