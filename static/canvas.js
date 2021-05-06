var predicted = -1;

window.addEventListener('load', () => {

  resize_();
  document.addEventListener('mousedown', startPainting);
  document.addEventListener('mouseup', stopPainting);
  document.addEventListener('mousemove', sketch);
  window.addEventListener('resize', resize_);
});

const canvas = document.getElementById('main-canvas');
const canvas_repr = document.getElementById('canvas-repr');

const ctx = canvas.getContext('2d');

canvas_repr.src = canvas.toDataURL();

function resize_() {
  ctx.canvas.width = 400;
  ctx.canvas.height = 400;
}

let coord = { x: 0, y: 0 };

let paint = false;

function getPosition(event) {
  coord.x = event.clientX - canvas.offsetLeft;
  coord.y = event.clientY - canvas.offsetTop;
}

function startPainting(event) {
  paint = true;
  getPosition(event);
}
function stopPainting() {
  paint = false;
  canvas_repr.src = canvas.toDataURL();
  predicted = do_prediction();
  render_prediction(predicted);
}

function sketch(event) {
  if (!paint) return;
  ctx.beginPath();
  ctx.lineWidth = 25;
  ctx.lineCap = 'round';
  ctx.strokeStyle = 'orange';
  ctx.moveTo(coord.x, coord.y);
  getPosition(event);
  ctx.lineTo(coord.x, coord.y);
  ctx.stroke();
}