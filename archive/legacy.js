//========================================
//-======= Functional programming way===
//=======================================
//not functional the way I thought it was
// function partial(func, ...argsBound) {
//   return function(...args) { // (*)
//     return func.bind(this, ...argsBound, ...args);
//   }
// }

function createTree(len, angle, accum) {

    accum.push(branch.bind(Object.create(null),len, angle));
    if (len > branchLimit) {
      accum.push
      createTree(len*randomReduction(),30, accum);
      return createTree(len*randomReduction(), -30, accum);
    }
    else {
      return accum;
    }
  }
  
  function branch(len, angle) {
    //We start by getting the last position
    console.log(retrieveGlobalPosition());
    pop();
    //We then draw the line and then go the line ending
    rotate(radians(angle));
    line(0,0,0,-len);
    translate();
    // Finally we push the line ending position into the stack
    // This only happens if we have another branch connected to this one
    // else, we don't push so that the next branch is connected to the previous
    // node
    if(len>branchLimit)
      push();
  }
  
  
  
  
  //This should simulate a for loop in functional programming
  //Essentially with recursion
  function callAll(array) {
    array[0]();
    if(array.length > 1)
      callAll(array.slice(1, array.length));
  }


//================================================================
//Doing it without persistence, the function gets recalled every frame rate
//=============================================================
// Makes this kind of moving tree animation
function branch(len) {
  line(0, 0, 0, -len);
  if (len > 3) {
    translate(0, -len)
    push();
    rotate(PI/4);
    branch(len*randomReduction());
    pop();
    push();
    rotate(-PI/4);
    branch(len*randomReduction());
    pop();
  }
}