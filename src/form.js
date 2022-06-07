process.stdin.setEncoding('utf8');
const fs = require('fs');

const { ChunkValidator } = require('./chunkValidator.js');

const formatHobbies = ({ hobbies }) => hobbies.split(',');

const writeContent = (content) => {
  fs.writeFileSync('responses.json', content, 'utf8');
};

const storeInJson = (responses) => {
  responses.hobbies = formatHobbies(responses);
  writeContent(JSON.stringify(responses));
};

const getQuery = (query) => query === 'dob' ? 'dob(yyyy-mm-dd)' : query;

const displayQuery = (query) => {
  const field = getQuery(query);
  console.log('Please enter your', field, ':');
};

const storeResponses = (responses, chunk, field) => {
  responses[field] = chunk.trim();
};

const hasReachedEndOfInput = (queries, index) => index >= queries.length - 1;

const isChunkValid = (chunk, field) => {
  const validator = new ChunkValidator(chunk);
  return validator[field]();
};

const getResponses = (queries) => {
  let index = 0;
  const responses = {};
  displayQuery(queries[index]);

  process.stdin.on('data', (chunk) => {
    const field = queries[index];

    if (isChunkValid(chunk, field)) {
      storeResponses(responses, chunk, field);

      if (hasReachedEndOfInput(queries, index)) {
        storeInJson(responses);
        console.log('Thank you');
        process.exit(0);
      }

      index++;
    }
    displayQuery(queries[index]);
  });
};

const main = () => {
  const queries = ['name', 'dob', 'hobbies', 'phoneNo'];
  getResponses(queries);
};

main();
