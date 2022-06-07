class ChunkValidator {
  #chunk;

  constructor(chunk) {
    this.#chunk = chunk;
  }

  #isNamesLengthLessThanFive() {
    return this.#chunk.length < 5;
  }

  #doNameHasOnlyLetters() {
    return this.#chunk.split('').every((character) => !parseInt(character));
  }

  name() {
    return this.#isNamesLengthLessThanFive() && this.#doNameHasOnlyLetters();
  }

  #isDobInYearMonthDateOrder(seperator) {
    return this.#chunk[4] + this.#chunk[7] === seperator + seperator;
  }

  #isDobNumeric() {
    return this.#chunk.split('-').every((character) => isFinite(character));
  }

  dob() {
    return this.#isDobInYearMonthDateOrder('-') && this.#isDobNumeric();
  }

  hobbies() {
    return this.#chunk !== '\n';
  }
}

exports.ChunkValidator = ChunkValidator;
