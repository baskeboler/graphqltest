var  fs = require('fs');
var path = require('path');
const readOptions = {
    encoding: 'utf-8'
};

const filePath = path.join(__dirname, 'schema.graphql');
const schemaText = fs.readFileSync(filePath, readOptions);

module.exports = schemaText;