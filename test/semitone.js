import {calSemitone} from '../src/chord';
import assert from 'assert';

describe('semitone测试', () => {

  it('C 6度', () => {
    const expected = 9;
    const actual = calSemitone(1, 6);
    assert.equal(expected, actual);
  })

  it('C 7度', () => {
    const expected = 11;
    const actual = calSemitone(1, 7);
    assert.equal(expected, actual);
  })

  it('C 14度', () => {
    const expected = 23;
    const actual = calSemitone(1, 14);
    assert.equal(expected, actual);
  })

  it('C 21度', () => {
    const expected = 35;
    const actual = calSemitone(1, 21);
    assert.equal(expected, actual);
  })
})