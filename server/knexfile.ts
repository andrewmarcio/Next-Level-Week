// Update with your config settings.
import path from 'path';

module.exports = {

  client: 'mysql',
  connection: {
    host: '127.0.0.1',
    port: 3308,
    user: 'root',
    password: '',
    database: 'nextlevelweek'
  },
  pool: {
    min: 2,
    max: 10
  },
  migrations: {
    directory: path.resolve(__dirname, 'src', 'database', 'migrations'),
  },
  seeds: {
    directory : path.resolve(__dirname, 'src', 'database', 'seeds')
  }
};