/* eslint-disable max-len */
const { ChunkValidator } = require('../src/chunkValidator.js');
const assert = require('assert');

describe('ChunkValidator', () => {
  it('Should return true if name hss maximum 5 characters and contains only characters', () => {
    const validator = new ChunkValidator('a');
    assert.strictEqual(validator.name(), true);
  });

  it('Should return false if name contains numbers or symbols', () => {
    const validator = new ChunkValidator('1');
    assert.strictEqual(validator.name(), false);
  });

  it('Should return false if name is greater than 5 character', () => {
    const validator = new ChunkValidator('abcdef');
    assert.strictEqual(validator.name(), false);
  });

  it('Should return true if dob is in year-Month-Date order and only numeric', () => {
    const validator = new ChunkValidator('2000-12-12');
    assert.strictEqual(validator.dob(), true);
  });

  it('Should return false if dob is not in year-Month-Date order', () => {
    const validator = new ChunkValidator('20-12-1200');
    assert.strictEqual(validator.dob(), false);
  });

  it('Should return false if dob contains character or symbol', () => {
    const validator = new ChunkValidator('20-12-1200');
    assert.strictEqual(validator.dob(), false);
  });

  it('Should return true if hobbies are present', () => {
    const validator = new ChunkValidator('cricket');
    assert.strictEqual(validator.hobbies(), true);
  });

  it('Should return false if hobbies are not present', () => {
    const validator = new ChunkValidator('\n');
    assert.strictEqual(validator.hobbies(), false);
  });
});
