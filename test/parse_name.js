import {parseName} from '../src/chord';
import {getKeyIdx} from '../src/utils';
import assert from 'assert';

describe('大三和弦测试', () => {
  it('C和弦', () => {
    var expect = [0, 4, 7].toString();
    var actual = parseName('C').toString();
    assert.equal(expect, actual);
  })

  it('E和弦', () => {
    var expect = [4, 8, 11].toString();
    var actual = parseName('E').toString();
    assert.equal(expect, actual);
  })

  it('A和弦', () => {
    var expect = [9, 1, 4].toString();
    var actual = parseName('A').toString();
    assert.equal(expect, actual);
  })
})

describe('小三和弦测试', () => {
  it('Cm和弦', () => {
    var expect = [0, 3, 7].toString();
    var actual = parseName('Cm').toString();
    assert.equal(expect, actual);
  })
})

describe('增三和弦测试', () => {
  it('Caug和弦', () => {
    var expect = [0, 4, 8].toString();
    var actual = parseName('Caug').toString();
    assert.equal(expect, actual);
  })

  it('Eaug和弦', () => {
    var expect = [4, 8, 0].toString();
    var actual = parseName('Eaug').toString();
    assert.equal(expect, actual);
  })
})

describe('减三和弦测试', () => {
  it('Cdim和弦', () => {
    var expect = [0, 3, 6].toString();
    var actual = parseName('Cdim').toString();
    assert.equal(expect, actual);
  })
})

describe('n度和弦', () => {
  it('C6', () => {
    var expect = [0, 4, 7, 9].toString();
    var actual = parseName('C6').toString();
    assert.equal(expect, actual);
  })

  it('E6', () => {
    var expect = [4, 8, 11, 1].toString();
    var actual = parseName('E6').toString();
    assert.equal(expect, actual);
  })

  it('C7', () => {
    var expect = [0, 4, 7, 10].toString();
    var actual = parseName('C7').toString();
    assert.equal(expect, actual);
  })

  it('C9', () => {
    var expect = [0, 4, 7, 10, 2].toString();
    var actual = parseName('C9').toString();
    assert.equal(expect, actual);
  })

  it('C11', () => {
    var expect = [0, 4, 7, 10, 5].toString();
    var actual = parseName('C11').toString();
    assert.equal(expect, actual);
  })

  it('Cm7', () => {
    var expected = [0, 3, 7, 10].toString();
    var actual = parseName('Cm7').toString();
    assert.equal(expected, actual);
  })

  it('Cmaj7', () => {
    var expected = [0, 4, 7, 11].toString();
    var actual = parseName('Cmaj7').toString();
    assert.equal(expected, actual);
  })

  it('CmM7', () => {
    var expected = [0, 3, 7, 11].toString();
    var actual = parseName('CmM7').toString();
    assert.equal(expected, actual);
  })

  it('Csus4', () => {
    var expected = [0, 5, 7].toString();
    var actual = parseName('Csus4').toString();
    assert.equal(expected, actual);
  })
  it('Esus4', () => {
    var expected = getKeyIdx('EAB').toString();
    var actual = parseName('Esus4').toString();
    assert.equal(expected, actual);
  })
  it('Esus2', () => {
    var expected = getKeyIdx('EF#B').toString();
    var actual = parseName('Esus2').toString();
    assert.equal(expected, actual);
  })

  it('Cadd9', () => {
    var expected = getKeyIdx('CEGD').toString();
    var actual = parseName('Cadd9').toString();
    assert.equal(expected, actual);
  })

  it('Eadd9', () => {
    var expected = getKeyIdx('EG#BF#').toString();
    var actual = parseName('Eadd9').toString();
    assert.equal(expected, actual);
  })

  it('G/B', () => {
    var expected = getKeyIdx('BDG').toString();
    var actual = parseName('G/B').toString();
    assert.equal(expected, actual);
  })
  it('C#/G#', () => {
    var expected = getKeyIdx('BDG').toString();
    var actual = parseName('G/B').toString();
    assert.equal(expected, actual);
  })
})