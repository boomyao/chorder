const KEYS = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

export function parseName(name) {
  const keys = [];
  const rootMatch = name.match(/^#?[A-G]/);
  if (!rootMatch) return keys;
  let root = rootMatch[0];
  root = root.split('').reverse().join('');
  const ridx = KEYS.indexOf(root);
  const left = name.substr(root.length);
  if (/^m{1}/.test(left) && !/^maj/.test(left)) {
    keys.push(...[ridx, (ridx + 3) % 12, (ridx + 7) % 12]); // 小三和弦
  } else if (/^(aug){1}/.test(left)) { // 增和弦
    keys.push(...[ridx, (ridx + 4) % 12, (ridx + 8) % 12]);
  } else if (/^(dim){1}/.test(left)) { // 减和弦
    keys.push(...[ridx, (ridx + 3) % 12, (ridx + 6) % 12]);
  } else {
    keys.push(...[ridx, (ridx + 4) % 12, (ridx + 7) % 12]); // 大三和弦
  }

  if (/^\d/.test(left) || /(m|g|j|M)\d/.test(left)) {
    const n = Number(left.match(/\d+$/g)[0]);
    if (/(6|7|9|11|13)/.test(n)) {
      if (n === 6) {
        keys[3] = (ridx + calSemitone(1, 6)) % 12;
      } else {
        const majAdd = /(j|M)\d/.test(left) ? 0 : -1;
        keys[3] = (ridx + calSemitone(1, 7) + majAdd) % 12;
        if (n > 7) {
          keys[4] = (ridx + calSemitone(1, n)) % 12;
        }
      }
    }
  } else if (/^add\d/.test(left)) {
    const n = Number(left.match(/^\d+$/g)[0]);
    if (n > 8) {
      keys[3] = ridx + (n % 7 - 1);
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

export function calSemitone(key, octave) {
  const fullTime = parseInt(octave / 8);
  let part = octave % 8;
  if (fullTime) part += fullTime;
  let total = fullTime * 12;
  if (part === 0) return total;
  if (key < 4) {
    if (part + key < 5) {
      total += 2 * (part - 1);
    } else if (part + key >= 5 && part + key <= 8) {
      total += 2 * (part - 1) - 1;
    } else {
      total += 2 * (part - 2);
    }
  } else {
    if (part + key < 9) {
      total += 2 * (part - 1);
    } else if (part + key >= 9 && part + key <= 11) {
      total += 2 * (part - 1) - 1;
    } else {
      total += 2 * (part - 2);
    }
  }
  return total;
}