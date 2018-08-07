import {orderChord} from '../src/chord';
import assert from 'assert';
import {getKeyIdx} from '../src/utils'

describe('order_chord', () => {
  it('G/B', () => {
    const data = getKeyIdx('BGBD');
    const expected = getKeyIdx('BDG').toString();
    const actual = orderChord(data).toString();
    assert.equal(expected, actual);
  })
})