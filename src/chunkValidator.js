class ChunkValidator {
  #chunk;

  constructor(chunk) {
    this.#chunk = chunk;
  }

  #isLengthLessThanFive() {
    return this.#chunk.length < 5;
  }

  #isNameWord() {
    const letters = this.#chunk.split('');
    return !isStringNumeric(letters);
  }

  name() {
    return this.#isLengthLessThanFive() && this.#isNameWord();
  }

  #isDobInYearMonthDateOrder(seperator) {
    return this.#chunk[4] + this.#chunk[7] === seperator + seperator;
  }

  #isDobNumeric() {
    const dateArray = this.#chunk.split('-');
    return isStringNumeric(dateArray);
  }

  dob() {
    return this.#isDobInYearMonthDateOrder('-') && this.#isDobNumeric();
  }

  hobbies() {
    return this.#chunk !== '\n';
  }

  #isLengthTen() {
    return this.#chunk.trim().length === 10;
  }

  #isPhoneNumberNumeric() {
    const letters = this.#chunk.split('');
    return isStringNumeric(letters);
  }

  phoneNo() {
    return this.#isLengthTen() && this.#isPhoneNumberNumeric();
  }
}

const isStringNumeric = (string) => {
  return string.every((character) => isFinite(character));
};

exports.ChunkValidator = ChunkValidator;
