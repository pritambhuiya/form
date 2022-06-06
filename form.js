/* eslint-disable no-console */
/* eslint-disable no-process-exit */
process.stdin.setEncoding('utf8');
const fs = require('fs');

const formatHobbies = ({ hobbies }) => hobbies.split(',');

const storeInJson = (responses) => {
  responses.hobbies = formatHobbies(responses);
  fs.writeFileSync('responses.json', JSON.stringify(responses), 'utf8');
};

const getQuery = (query) => query === 'dob' ? 'dob(yyyy-mm-dd)' : query;

const displayQuery = (query) => {
  const message = getQuery(query);
  console.log('Please enter your', message, ':');
};

const storeResponses = (responses, queries, index, chunk) => {
  const field = queries[index];
  responses[field] = chunk.trim();
};

const hasReachedEndOfInput = (queries, index) => index >= queries.length - 1;

const getResponses = (queries) => {
  let index = 0;
  const responses = {};
  displayQuery(queries[index]);

  process.stdin.on('data', (chunk) => {
    storeResponses(responses, queries, index, chunk);

    if (hasReachedEndOfInput(queries, index)) {
      storeInJson(responses);
      console.log('Thank you');
      process.exit(0);
    }

    index++;
    displayQuery(queries[index]);
  });
};

const main = () => {
  const queries = ['name', 'dob', 'hobbies'];
  getResponses(queries);
};

main();
