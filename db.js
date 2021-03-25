/*const { Client } = require('pg')

Client.Promise = global.Promise
const connectionData = {
    user: 'postgres',
    host: '',
    database: 'db_braty',
    password: '123',
    port: 5432,
  }
const client = new Pg(connectionData)
async function connect(uri) {
    await Client.connect(uri,{
        client.connect()
        client.query("SELECT * FROM table")
            .then(response => {
                console.log(response.rows)
                client.end()
            })
            .catch(err => {
                client.end()
            })
    })
    .then(() => console.log('[db] Conectada con éxito.'))
    .catch(error => console.error('[db] Problema con la conexion', error))
    
    /*var client = await new pg.Client(uri)
    client.connect()
        .then(() => console.log('[db] Conectada con éxito.'))
        .catch(error => console.error('[db] Problema con la conexion', error))
}
module.exports = connect*/
const { Pool } = require("pg")
// Coloca aquí tus credenciales
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "db_chat",
  password: "123",
  port: 5432,
});
module.exports = pool;