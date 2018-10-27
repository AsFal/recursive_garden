// =========================
// With the Tree Object way
// var fractalTree = Object.create(Tree);
// fractalTree.__init__(100,0);
// ==========================

// ========================
// With the vectorTree Object way
var fractalTree = Object.create(VectorTree);
var fractalTwo = Object.create(VectorTree);
var fractalThree = Object.create(VectorTree);

var forest = [];
for (let index = 0; index < 4; index++) {
  forest.push(Object.create(VectorTree))
}

var forest = Object.create(Forest);
 // The function automatically finds the position of trunk by itself

function setup() {
  createCanvas(400,400);
  frameRate(30);

  console.log(width);
  console.log(height-height/2);
  var forestOptions = [
    {
      name: "right",
      root: createVector(width, height-height/2),
      direction : 180,
      complexity: 2,
      trunkLength: 60,
      random: true
    },
    {
      name: "bottom",
      root: createVector(width-width/2, height),
      direction : -80,
      complexity: 2,
      trunkLength: 60,
      random: false
    },
    { 
      name: "left",
      root: createVector(0, height-height/2),
      direction :0,
      complexity: 3,
      trunkLength: 60,
      random: false
    },
    {
      name: "top",
      root: createVector(width-width/2, 0),
      direction : 90,
      complexity: 1,
      trunkLength: 100,
      random: false
    }
  ]
  
  // for (let index = 0; index < forest.length; index++) {
  //   forest[index].__init__(forestOptions[index]);
  // }
  forest.__init__(forestOptions);
}

function mousePressed() {
  let trees = Object.values(forest.trees);
  trees.forEach((tree)=>{tree.branchOut()})
}
//Draw identifies height as heifht of canvas
function draw() {

  background(51);
  stroke(255);

  // translate(200,height);
  // fractalTree.draw();
  forest.show();
  // forest.forEach((tree)=>{tree.show()})
}



//===================Helper Method===========
/* generates a number between 0.5 and 0.7*/
function randomReduction(){
  return Math.random()*0.2+0.5;
}



