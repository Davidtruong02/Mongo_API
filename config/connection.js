const { connect, connection } = require('mongoose');

const connectionString = "mongodb://localhost:27017/FacebookCloneDB";

connect(connectionString,);

module.exports = connection;