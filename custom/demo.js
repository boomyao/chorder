import Chorder from '../src/chorder';

const ctx = document.getElementById('c').getContext('2d');

console.log(ctx)

var chorder = new Chorder(ctx, 0 , 0, 40, 50);

chorder.drawChord('C');