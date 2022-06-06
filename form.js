
const readChunk = (placeHolders, index, message,) => {
  process.stdin.on('data', (chunk) => {
    placeHolders[index][message] = chunk.trim();
    index++;
    // console.log('\nchunk:\n', chunk);
    // console.log(placeHolders);
    if (index > 2) {
      console.log(placeHolders);
    }
    readAllChunks(index);

  });

  process.stdin.on('end', () => {
    console.log('end');
  });

  process.stdin.on('close', () => {
    console.log('close');
  });
};

const readAllChunks = (index) => {
  process.stdin.setEncoding('utf8');

  const placeHolders = [{ name: '' }, { dob: '' }, { hobbies: '' }];
  const field = Object.keys(placeHolders[index])[0];
  const message = field === 'dob' ? 'dob(yyyy - mm - dd)' : field;

  console.log(`Please enter your ${message} : `);
  readChunk(placeHolders, index, message);
};

const main = () => {
  const index = 0;
  readAllChunks(index);
};

main();
