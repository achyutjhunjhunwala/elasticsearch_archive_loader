const fs = require('fs');
const { Client } = require('@elastic/elasticsearch');
const JSONStream = require('JSONStream');

const client = new Client({
  node: 'https://YOUR_ES_HOST_NAME', // Replace with your Elasticsearch URL
  auth: {
    username: 'elastic',
    password: 'YOUR_PASSWORD'
  }
});

const docs = [];

const stream = fs.createReadStream('data.json', 'utf8'); // Replace with your file path
const parser = JSONStream.parse('*');

stream.pipe(parser);

parser.on('data', doc => {
  docs.push(doc);
});

parser.on('end', () => {
  const filteredDocs = docs.filter(doc => typeof doc === "object").filter(doc => !doc.index.startsWith('.'))
  bulkInsert(filteredDocs)
    .then(() => {
      console.log('Bulk insert completed.');
      console.log('Done')
    })
    .catch(error => {
      console.error('Error during bulk insert:', error);
    });
});

async function bulkInsert(data) {
  const body = [];

  data.forEach(doc => {
    body.push({ index: { _index: doc.index, _id: doc.id } });
    body.push(doc.source);
  });

  const { body: response } = await client.bulk({ refresh: true, body });
  console.log(response);
}
