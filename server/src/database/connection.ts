import knex from 'knex';

const connection = knex({
    client: 'mysql',
    connection: {
        host : 'localhost',
        port: 3308,
        user : 'root',
        password : '',
        database : 'nextlevelweek'
      },
      useNullAsDefault : true,
});

export default connection;