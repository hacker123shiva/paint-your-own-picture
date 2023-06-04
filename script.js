// Get the canvas element
const canvas = document.querySelector('.cd');
const colorInput = document.querySelector('.color-change');
const range = document.querySelector('.range');
const clearButton = document.querySelector('.clear');
const heightInput = document.querySelector('.height');
const widthInput = document.querySelector('.width');
const changeSize = document.querySelector('.change-size');
// Get the 2D drawing context
const ctx = canvas.getContext('2d');

// Set the initial brush properties
ctx.lineWidth = 5;
ctx.lineJoin = 'round';
ctx.lineCap = 'round';
ctx.strokeStyle = 'red';

// Variable to track if the user is currently drawing
let isDrawing = false;

//default canvas size
canvas.height = 400;
canvas.width = 900;
// ctx.clearRect(0, 0, canvas.width, canvas.height);
//event listeners for color and range
colorInput.addEventListener('change', () => {
  let color = colorInput.value;
  ctx.strokeStyle = color;
});

range.addEventListener('input', () => {
  let rangeValue = range.value;
  ctx.lineWidth = rangeValue;
});

// Event listener for clear button
clearButton.addEventListener('click', clearCanvas);

changeSize.addEventListener('click', () => {
  let heightValue = heightInput.value;
  let widthValue = widthInput.value;

  if (heightValue.trim() === '' || widthValue.trim() === '') {
    alert('Please enter the values');
    return;
  } else {
    canvas.height = heightValue;
    canvas.width = widthValue;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    heightInput.value = '';
    widthInput.value = '';
  }

  console.log('shiva');
});

// Event listeners for mouse events
canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', stopDrawing);
canvas.addEventListener('mouseout', stopDrawing);

//for pentab
canvas.addEventListener('pointerdown', startDrawing);
canvas.addEventListener('pointermove', draw);
canvas.addEventListener('pointerup', stopDrawing);
canvas.addEventListener('pointerout', stopDrawing);

/* for default canvas

// Function to start drawing
function startDrawing(event) {
  isDrawing = true;
  ctx.beginPath();
  ctx.moveTo(
    event.clientX - canvas.offsetLeft,
    event.clientY - canvas.offsetTop
  );

  ctx.stroke();
}

// Function to draw
function draw(event) {
  if (!isDrawing) return;
  ctx.lineTo(
    event.clientX - canvas.offsetLeft,
    event.clientY - canvas.offsetTop
  );
  console.log(
    'lineTo:',
    event.clientX - canvas.offsetLeft,
    event.clientY - canvas.offsetTop
  );
}
*/

//for reshaping the canvas
function startDrawing(event) {
  isDrawing = true;
  const canvasRect = canvas.getBoundingClientRect();
  const scaleX = canvas.width / canvasRect.width;
  const scaleY = canvas.height / canvasRect.height;
  const offsetX = canvasRect.left;
  const offsetY = canvasRect.top;
  ctx.beginPath();
  ctx.moveTo(
    (event.clientX - offsetX) * scaleX,
    (event.clientY - offsetY) * scaleY
  );
}

//scale the canvas
function draw(event) {
  if (!isDrawing) return;
  const canvasRect = canvas.getBoundingClientRect();
  const scaleX = canvas.width / canvasRect.width;
  const scaleY = canvas.height / canvasRect.height;
  const offsetX = canvasRect.left;
  const offsetY = canvasRect.top;
  ctx.lineTo(
    (event.clientX - offsetX) * scaleX,
    (event.clientY - offsetY) * scaleY
  );
  ctx.stroke();
}

// Function to stop drawing
function stopDrawing() {
  isDrawing = false;
}

// Function to clear the canvas
function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}
