/* eslint-disable no-param-reassign */
process.stdin.setEncoding('utf8');
const fs = require('fs');

const { ChunkValidator } = require('./chunkValidator.js');

const writeContent = (content) => {
  fs.writeFileSync('responses.json', content, 'utf8');
};

const formatHobbies = ({ hobbies }) => hobbies.split(',');
const formatAddress = ({ address }) => address.join('\n');

const formatResponses = (responses) => {
  responses.address = formatAddress(responses);
  responses.hobbies = formatHobbies(responses);
};

const storeInJson = (responses) => {
  formatResponses(responses);
  writeContent(JSON.stringify(responses));
};

const isAddressField = (field) => field.startsWith('addressLine');

const storeResponses = (responses, chunk, field) => {
  const trimmedChunk = chunk.trim();

  isAddressField(field)
    ? responses.address.push(trimmedChunk) : responses[field] = trimmedChunk;
};

const getQuery = (query) => query === 'dob' ? 'dob(yyyy-mm-dd)' : query;

const displayQuery = (query) => {
  const field = getQuery(query);
  console.log('Please enter your', field, ':');
};

const hasReachedEndOfInput = (queries, index) => index >= queries.length - 1;

const isChunkValid = (chunk, field) => {
  if (isAddressField(field)) {
    return true;
  }

  const validator = new ChunkValidator(chunk);
  return validator[field]();
};

const parseInputs = (responses, queries, index) => {
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

const getResponses = (queries) => {
  const index = 0;
  const responses =
    { name: '', dob: '', hobbies: [], phoneNo: '', address: [] };

  displayQuery(queries[index]);
  parseInputs(responses, queries, index);
};

const main = () => {
  const queries =
    ['name', 'dob', 'hobbies', 'phoneNo', 'addressLine1', 'addressLine2'];
  getResponses(queries);
};

main();
