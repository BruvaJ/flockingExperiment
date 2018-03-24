var flock =  [];
var canvas;
var alignmentDistance = 10;
var alignmentStrength = 0.5;
var alignmentLimit = 2;
var minSpeed = 7;
var maxSpeed = 15;

class Boid {

  // var location;
  // var accel;
  // var height;
  // var width;

  constructor(){
    this.location = [200, 200];
    this.accel = [5, 0]; // default to moving right one pixel at a time
    this.height = 5;
    this.width = 5;
  }

  updateLocation(){
    this.location[0] += this.accel[0];
    this.location[1] += this.accel[1];
    // console.log(this.location[0]);
  }

  alterAcceleration(x, y){
  }

  increaseAccelX(amount){
    if((this.accel[0] + amount) * -1  < maxSpeed) this.accel[0] += amount;
  }

  increaseAccelY(amount){

  }

  decreaseAccelX(amount){
    var newSpeed = (this.accel[0] - amount) * -1;
    if(newSpeed > minSpeed) {
      this.accel[0] += amount;
    } else{
      console.log('no');}
  }

  decreaseAccelY(amount){

  }


  checkForEdge(){
    // bounceback
    // if(this.location[0] + flock[i].width > canvas.width || this.location[0] + flock[i].width < 0) this.accel[0] = this.accel[0] * -1;
    // if(this.location[1] + flock[i].height > canvas.height || this.location[1] + flock[i].height < 0) this.accel[1] = this.accel[1] * -1;

    // other side
    if(this.location[0] + flock[i].width > canvas.width)   this.location[0] = 0;
    if(this.location[0] + flock[i].width < 0)              this.location[0] = canvas.width;
    if(this.location[1] + flock[i].height > canvas.height) this.location[1] = 0;
    if(this.location[1] + flock[i].height < 0)             this.location[1] = canvas.height;
  }

  randomElement(){
    var random = Math.floor(Math.random() * 50) + 1;
    if(random === 1){
      this.accel[0] += 2;
    }
    if(random === 2){
      this.accel[0] -= 2;
    }
    if(random === 3){
      this.accel[1] += 2;
    }
    if(random === 4){
      this.accel[1] -= 2;
    }
    if(random === 5){//switch direciton
      this.accel[0] *= -1;
    }
   if(random === 6){//switch direciton
      this.accel[1] *= -1;
    }
  }

  separation(){
  }
  alignment(){
    var sumX = 0;
    var sumY = 0;
    var fastestX = this.accel[0];
    var fastestY = this.accel[1];
    var countAligned = 0;
    for(i in flock){
        // isnt this instance   ( )                                                 // within alignmentDistance
      if(flock[i] !== this && flock[i].location[0] >= this.location[0] - alignmentDistance && flock[i].location[0] <= this.location[0] + alignmentDistance  && flock[i].location[0] >= this.location[0] - alignmentDistance && flock[i].location[1] <= this.location[1] + alignmentDistance){
        countAligned ++;
        sumX += flock[i].accel[0];
        sumY += flock[i].accel[1];
        // if(fastestX > flock[i].accel[0]) this.accel[0] = flock[i].accel[0];
        // if(fastestY > flock[i].accel[1]) this.accel[1] = flock[i].accel[1];
        console.log('within Distance');
      }
    }
    // 1) average
    var averageX = sumX / countAligned;
    var averageY = sumY / countAligned;

    // a)
    // if(averageX > 0 && averageY > 0){
    //   this.accel[0] += (averageX < this.accel[0]) ? -1 : 1;
    //   this.accel[1] += (averageY < this.accel[1]) ? -1 : 1;
    // }

    // b>
    // if(averageX > 0 && averageY > 0){
    //   this.accel[0] = averageX;
    //   this.accel[1] = averageY;
    // }

    // c)
    if(averageX > this.accel[0]) this.accel[0] ++;
    if(averageX < this.accel[0]) this.accel[0] --;
    if(averageY > this.accel[1]) this.accel[1] ++;
    if(averageY < this.accel[1]) this.accel[1] --;


    // 3) fastest
    // this.accel[0] = fastestX;
    // this.accel[1] = fastestY;
    // console.log(fastestX);
    // console.log(fastestY);
  }

  speedCheck(){
    if(this.accel[0] > maxSpeed) this.accel[0] = maxSpeed;
    if(this.accel[1] > maxSpeed) this.accel[1] = maxSpeed;
  }

  cohesion(){
  }
}

function render(){
ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (i in flock){

    console.log(flock);
    // ctx.clearRect(flock[i].location[0] + flock[i].width / 2, flock[i].location[1] + flock[i].height / 2 - 1, flock[i].width, flock[i].height); // just gonna have to clear everything anyway
    flock[i].checkForEdge();
    // flock[i].separation();
    // flock[i].cohesion();
    flock[i].updateLocation();
    flock[i].randomElement();
    ctx.fillRect(flock[i].location[0] + flock[i].width / 2, flock[i].location[1] + flock[i].height / 2, flock[i].width, flock[i].height);
    flock[i].alignment();
    flock[i].speedCheck();
  }
}

window.onload = start();

document.getElementById('forward').addEventListener("click", function(){
  render();
});

canvas.addEventListener("click", function(){
  flock.push(new Boid());
});

function start(){
  canvas = document.getElementById("flock");
  ctx = canvas.getContext('2d');
  var b = new Boid();
  flock.push(b);
  render();
}
