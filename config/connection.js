const { connect, connection } = require('mongoose');

const connectionString = "mongodb://localhost:27017/database-TBD";

connect(connectionString,);

module.exports = connection;