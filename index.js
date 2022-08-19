const { getResponses } = require("./src/form");

const main = () => {
  const queries = ['name', 'dob', 'hobbies', 'phoneNo', 'addressLine1', 'addressLine2'];
  getResponses(queries);
};
main();
