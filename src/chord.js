const CHORD_DIC = {
  'C': {
    chord: [[1,0], [2,1], [3,0], [4,2], [5,3], [6,'x']],
    position: 1
  },
  'C7': {
    chord: [[1,0], [2,1], [3,3], [4,2], [5,3], [6,'x']],
    position: 1
  },
  '#Cm': {
    chord: [[2,2], [3,3], [4,3], [6,'x']],
    position: 4,
    bars: [
      {from_string: 5, to_string: 1, fret: 1}
    ]
  },
  'D': {
    chord: [[2, 3], [4, 0], [5,'x'], [6,'x']],
    position: 1,
    bars: [
      {from_string: 3, to_string: 1, fret: 2}
    ]
  },
  'Dm': {
    chord: [[1,1], [2,3], [3,2], [4, 0], [5,'x'], [6,'x']],
    position: 1
  },
  '#Dm': {
    chord: [[2,2], [3,3], [4, 4], [6,'x']],
    position: 5,
    bars: [
      {from_string: 4, to_string: 1, fret: 1}
    ]
  },
  'D7': {
    chord: [[1,2], [2,1], [3,2], [4, 0], [5,'x'], [6,'x']],
    position: 1
  },
  'E': {
    chord: [[1,0], [2,0], [3,1], [4, 2], [5,2], [6,0]],
    position: 1
  },
  'E7': {
    chord: [[1,0], [2,4], [3,1], [4, 2], [5,2], [6,0]],
    position: 1
  },
  'Em': {
    chord: [[1,0], [2,0], [3,0], [4, 2], [5,2], [6,0]],
    position: 1
  },
  'F': {
    chord: [[3,2], [4,3], [5,3]],
    position: 1,
    bars: [
      {from_string: 6, to_string: 1, fret: 1}
    ]
  },
  '#F': {
    chord: [[3,3], [4,4], [5,4]],
    position: 1,
    bars: [
      {from_string: 6, to_string: 1, fret: 2}
    ]
  },
  '#F': {
    chord: [[3,3], [5,4]],
    position: 1,
    bars: [
      {from_string: 6, to_string: 1, fret: 2}
    ]
  },
  '#Fm': {
    chord: [[4,4], [5,4]],
    position: 1,
    bars: [
      {from_string: 6, to_string: 1, fret: 2}
    ]
  },
  'G': {
    chord: [[1,3], [2,0], [3,0], [4, 0], [5,2], [6,3]],
    position: 1
  },
  'G7': {
    chord: [[1,1], [2,0], [3,0], [4, 0], [5,2], [6,3]],
    position: 1
  },
  'Gm': {
    chord: [[4,5], [5,5]],
    position: 1,
    bars: [
      {from_string: 6, to_string: 1, fret: 3}
    ]
  },
  '#Gm': {
    chord: [[4,3], [5,3]],
    position: 4,
    bars: [
      {from_string: 6, to_string: 1, fret: 1}
    ]
  },
  'A': {
    chord: [[1,0], [2,2], [3,2], [4, 2], [5,0], [6,'x']],
    position: 1
  },
  'Am': {
    chord: [[1,0], [2,1], [3,2], [4, 2], [5,0], [6,'x']],
    position: 1
  },
  'A7': {
    chord: [[1,0], [2,2], [3,0], [4, 2], [5,0], [6,'x']],
    position: 1
  },
  'B': {
    chord: [[2,4], [3,4], [4, 4], [6,'x']],
    position: 1,
    bars: [
      {from_string: 5, to_string: 1, fret: 2}
    ]
  },
  'Bm': {
    chord: [[2,3], [3,3], [4, 3]],
    position: 1,
    bars: [
      {from_string: 6, to_string: 1, fret: 1}
    ]
  },
  'bB': {
    chord: [[2,3], [3,4], [4, 4], [6,'x']],
    position: 1,
    bars: [
      {from_string: 5, to_string: 1, fret: 2}
    ]
  },
  'B7': {
    chord: [[1,2], [2,0], [3,2], [4, 1], [5,2], [6,'x']],
    position: 1
  },
}

const KEYS = ['C', 'C#', 'D', 'D#', 'E', 'F', 'G', 'G#', 'A', 'A#', 'B'];

// export function getChord(name) {
//   const type = getType(name);
//   const str = findRoot();
// }

function parseName(name) {
  const keys = [];
  const rootMatch = name.match(/^#?`[A-G]/);
  if (!rootMatch) return keys;
  let root = rootMatch[0];
  root = root.split('').reverse().join();
  const ridx = KEYS.indexOf(root);
  const left = name.substr(root.length);
  if (!left) { // 大三和弦
    keys.push(...[ridx, ridx + 4 % 11, ridx + 7 % 11]);
  } else if (/^m{1}/.test(left) && !/^maj/.test(left)) { 
    keys.push(...[ridx, ridx + 3 % 11, ridx + 7 % 11]); // 小三和弦
  } else if (/^(aug){1}/.test(left)) { // 增和弦
    keys.push(...[ridx, ridx + 4 % 11, ridx + 4 % 11]); 
  } else if (/^(dim){1}/.test(left)) { // 减和弦
    keys.push(...[ridx, ridx + 3 % 11, ridx + 6 % 11]);
  }

  if (/^\d/.test(left) || /(m|g|j|M)\d/.test(left)) {
    const n = Number(left.match(/^\d+$/g)[0]);
    if (n === 6) {
      keys[3] = (ridx + 8) % 11;
    } else if (n >= 7) {
      const majAdd = /(j|M)\d/.test(left) ? 1 : 0;
      keys[3] = (ridx + 8) % 11 + majAdd;
      if (n === 9) {
        keys[4] = (ridx + 12) % 11;
      } else if (n === 11) {
        keys[4] = (ridx + 16) % 11;
      } else if (n === 13) {
        keys[4] = (ridx + 19) % 11;
      }
    }
  } else if (/^add\d/.test(left)) {
    const n = Number(left.match(/^\d+$/g)[0]);
    if (n > 8) {
      keys[3] = ridx + (n%7-1);
    }
  }

  if (/sus(2|4)/.test(left) && keys.length >= 3) { // sus
    const n = left.match(/sub(2|4)/g)[0][3];
    if (n === '2') keys[1] -= 2;
    if (n === '4') keys[1] += 1;
  }
  if (/-\d$/.test(left)) {
    const n = left.match(/-\d$/g)[0].substr(1);
    if (keys[Number(n)]) keys[Number(n)]--;
  }
  return keys;
}

function calSemitone(key, octave) {
  const fullTime = parseInt(octave / 8);
  const part = octave % 8;
  let total = fullTime * 12;
  if (key < 4) {
    if (part + key < 5) {
      total += 2 * (part - 1);
    } else if (part + key >= 5 && part + key <=8 ) {
      total += 2 * (part - 1) -1;
    } else {
      total += 2 * (part - 1) - 2;
    }
  } else {
    if (part + key <= 9) {
      total += 2 * part;
    } else if (part + key > 9 && part + key <= 11) {
      total += 2*part -1;
    } else {
      total += 2*part - 2;
    }
  }
  return total;
}

console.log(calSemitone(4, 7))