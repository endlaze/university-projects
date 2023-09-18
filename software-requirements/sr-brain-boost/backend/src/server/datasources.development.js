module.exports = {
  postgreDS: {
    host: process.env.PSQL_HOST,
    port: process.env.PSQL_PORT,
    url: process.env.PSQL_URL,
    database: process.env.PSQL_DB,
    password: process.env.PSQL_KEY,
    user: process.env.PSQL_USER
  }
}