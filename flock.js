
var ctx;
var x = 250;
var y = 200;
var width = 50;
var height = width / 2;

window.onload = drawTriangle(x, y, width, height);


function drawTriangle(startX, startY, triangleWidth, triangleHeight){
  var canvas = document.getElementById("flock");
  ctx = canvas.getContext('2d');

  ctx.beginPath();
  ctx.moveTo(startX, startY);
  ctx.lineTo(x - triangleWidth, y + triangleHeight);
  ctx.lineTo(x - triangleWidth, y - triangleHeight);
  ctx.fill();
  updateUI();
}

function moveForward(){
  x += 10;
  // y += 10;
  drawTriangle(x, y, width, height);

}

function turnRight(){
  // ctx.moveTo(centerX() + 300, centerY() - 1000);
  // (60, 65, 5, 0, Math.PI * 2, true);
  ctx.translate( x, y );
  ctx.rotate((2 * Math.PI / 180) * 5);
  // drawTriangle(x, y, width, height);

}

function turnLeft(){
}

function centerX(){
  return (((x - width) + (x - width) + (x))  / 3);
}

function centerY(){
  return (((y + height) + (y - height) + (y)) / 3);
}

function updateUI(){
  document.getElementById("x").innerText = x;
  document.getElementById("y").innerText = y;
  document.getElementById("a").innerText = x + ', ' + y;
  document.getElementById("b").innerText = x - width + ', ' + (y + height);
  document.getElementById("c").innerText = x - width + ', ' + (y - height);
  document.getElementById("ox").innerText = centerX();
  document.getElementById("oy").innerText = centerY();
}


document.getElementById('forward').addEventListener("click", function(){
  moveForward();
  updateUI();
});
document.getElementById('right').addEventListener("click", function(){
    turnRight();
    updateUI();
});
document.getElementById('left').addEventListener("click", function(){
    turnLeft();
    updateUI();
});
