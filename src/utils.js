const KEYS = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

export function getKeyIdx(names) {
  const list = [];
  names.match(/[A-G]#?/g).forEach(k => {
    list.push(KEYS.indexOf(k));
  })
  return list;
}