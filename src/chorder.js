/*
 * Vex Guitar Chord Chart Renderer.
 * Renference and modify with "https://github.com/0xfe/vexchords"
 *
 */

import {getChord} from './chord';

function Chorder (context, x, y, width, height) {
  this.context = context;
  this.x = x;
  this.y = y;

  this.width = (!width) ? 100 : width;
  this.height = (!height) ? 100 : height;
  this.num_strings = 6;
  this.num_frets = 5;

  this.spacing = this.width / (this.num_strings);
  this.fret_spacing = (this.height) / (this.num_frets + 2);

  this.metrics = {
    circle_radius: this.width / 24,
    text_shift_x: this.width / 29,
    text_shift_y: this.height / 29,
    font_size: Math.ceil(this.width / 9),
    chord_name_font_size: Math.ceil(this.width / 4.5),
    bar_shift_x: this.width / 28,
    bridge_stroke_width: Math.ceil(this.height / 36),
    chord_fill: "#444",
    chord_name_bottom_padding: this.fret_spacing * 0.2,
  };

  // Add room on sides for finger positions on 1. and 6. string
  this.x += this.spacing / 2;
  this.y += this.fret_spacing + 1.2 + this.metrics.chord_name_font_size;

  // Content
  this.position = 0;
  this.position_text = 0;
  this.chord = [];
  this.bars = [];

  if (this.context && !this.context.setFont) {
    this.cotnext.setFont = function(family, size, weight) {
      this.vexFlowCanvasContext.font = (weight || '') + ' ' + size + 'pt' + family;
      return this;
    }
  }
}

Chorder.prototype.setNumFrets = function (num_frets) {
  this.num_frets = num_frets;
  this.fret_spacing = (this.height) / (this.num_frets + 1);
  return this;
}

Chorder.prototype.setChord = function (chord, position, bars, tuning) {
  this.chord = chord;
  this.position = position || 0;
  this.bars = bars || [];
  this.tuning = tuning || ["E", "A", "D", "G", "B", "E"];
  if (tuning == [])
    this.fret_spacing = (this.height) / (this.num_frets + 1);
  return this;
}

Chorder.prototype.setPositionText = function (position) {
  this.position_text = position;
  return this;
}

Chorder.prototype.draw = function () {
  var spacing = this.spacing;
  var fret_spacing = this.fret_spacing;

  // Draw guitar bridge
  if (this.position <= 1) {
    drawLine(this.context,
      { x: this.x, y: this.y - this.metrics.bridge_stroke_width / 2 },
      { x: this.x + (spacing * (this.num_strings - 1)), y: this.y - this.metrics.bridge_stroke_width / 2 },
      { lineWidth: this.metrics.bridge_stroke_width });
  } else {
    // Draw position number
    drawText(this.context, this.position,
      this.x - (this.spacing / 2) - this.metrics.text_shift_x,
      this.y + (this.fret_spacing / 2) + this.metrics.text_shift_y + (this.fret_spacing * this.position_text),
      { fontSize: this.metrics.font_size });
  }

  // Draw strings
  for (var i = 0; i < this.num_strings; ++i) {
    drawLine(this.context,
      { x: this.x + (spacing * i), y: this.y },
      { x: this.x + (spacing * i), y: this.y + (fret_spacing * (this.num_frets)) });
  }

  // Draw frets
  for (var i = 0; i < this.num_frets + 1; ++i) {
    drawLine(this.context,
      { x: this.x, y: this.y + (fret_spacing * i) },
      { x: this.x + (spacing * (this.num_strings - 1)), y: this.y + (fret_spacing * i) });
  }

  // Draw tuning keys
  if (this.tuning != []) {
    var tuning = this.tuning;
    for (var i = 0; i < tuning.length; ++i) {
      drawText(this.context, tuning[i],
        this.x + (this.spacing * i) - this.metrics.font_size/3,
        this.y + ((this.num_frets + 1) * this.fret_spacing),
        { fontSize: this.metrics.font_size });
    }
  }

  // Draw chord
  for (var i = 0; i < this.chord.length; ++i) {
    this.lightUp(this.chord[i][0], this.chord[i][1]);
  }

  // Draw bars
  for (var i = 0; i < this.bars.length; ++i) {
    this.lightBar(this.bars[i].from_string,
      this.bars[i].to_string,
      this.bars[i].fret);
  }
}

Chorder.prototype.lightUp = function (string_num, fret_num) {
  string_num = this.num_strings - string_num;

  var shift_position = 0;
  if (this.position == 1 && this.position_text == 1) {
    shift_position = this.position_text;
  }

  var mute = false;

  if (fret_num == "x") {
    fret_num = 0;
    mute = true;
  }
  else {
    fret_num -= shift_position;
  }

  var x = this.x + (this.spacing * string_num);
  var y = this.y + (this.fret_spacing * (fret_num));

  if (fret_num == 0) y -= this.metrics.bridge_stroke_width;

  if (!mute) {
    if (fret_num > 0) drawDot(this.context, x, y - Math.floor(this.fret_spacing / 2), this.metrics.circle_radius, {fill: this.metrics.chord_fill});
    else drawArc(this.context, x, y - Math.floor(this.fret_spacing / 2), this.metrics.circle_radius);
  } else {
    drawText(this.context, "X", x - this.metrics.font_size/3, y - (this.fret_spacing - this.metrics.font_size), {fontSize: this.metrics.font_size})
  }

  return this;
}

Chorder.prototype.lightBar = function (string_from, string_to, fret_num) {
  if (this.position == 1 && this.position_text == 1) {
    fret_num -= this.position_text;
  }

  let string_from_num = this.num_strings - string_from;
  let string_to_num = this.num_strings - string_to;

  var x = this.x + (this.spacing * string_from_num) - this.metrics.bar_shift_x;
  var x_to = this.x + (this.spacing * string_to_num) + this.metrics.bar_shift_x;

  var y = this.y + (this.fret_spacing * (fret_num - 1)) +
    (this.fret_spacing / 4);
  var y_to = this.y + (this.fret_spacing * (fret_num - 1)) +
    ((this.fret_spacing / 4) * 3);

  drawRect(this.context, x, y, (x_to - x), (y_to - y), {fill: this.metrics.chord_fill});
  return this;
}

Chorder.prototype.drawChord = function (chord_name) {
  const chord_data = getChord(chord_name);
  if (!chord_data) throw `chord dictionary have not chord name ${chord_name}.`;
  this.setChord(chord_data.chord, chord_data.position, chord_data.bars, this.tuning);
  this.draw();
  this.drawName(chord_name);
}

Chorder.prototype.drawName = function (chord_name) {
  drawText(this.context, chord_name, 
    this.x + this.width/2 - this.metrics.chord_name_font_size * chord_name.length / 2,
    this.y - this.fret_spacing - this.metrics.chord_name_bottom_padding, 
    {fontSize: this.metrics.chord_name_font_size, fontWeight: 'bold'})
}

function drawLine(context, bp, ep, style = {}) {
  context.lineWidth = style.lineWidth || 1;
  context.beginPath();
  context.moveTo(bp.x, bp.y);
  context.lineTo(ep.x, ep.y);
  context.stroke();
}

function drawText(context, text, x, y, fontStyle = {}) {
  const fontSize = fontStyle.fontSize || 10;
  const fontWeight = fontStyle.fontWeight || 'normal';
  const family = fontStyle.family || 'sans-serif';
  context.setFont(family, fontSize, fontWeight);
  context.fillText(text, x, y);
}

function drawDot(context, x, y, r, style = {}) {
  context.fillStyle = style.fill || '#444';
  context.beginPath();
  context.arc(x, y, r, 0, Math.PI * 2);
  context.fill();
}

function drawArc(context, x, y,r) {
  context.beginPath();
  context.arc(x, y, r, 0, Math.PI * 2);
  context.stroke();
}

function drawRect(context, x, y, w, h, style = {}) {
  context.fillStyle = style. fill || '#444';
  context.beginPath();
  context.fillRect(x, y, w, h);
}

export default Chorder;