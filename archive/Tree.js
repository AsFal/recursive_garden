/*Make an options object which could make trees according to these feature
- Number of branches on each side (or random number)
- Symmetric or Random
- Lean direction
- Upside down tree and start positions
- Color
- presence of leaves
- L system trees
- Change the types of trunks
- Capture an image
- Branch cutoff
- Animations
-  Differents types of physics
-  Arrow shot at the tree 
*/


var Tree = {
    branchLimit: 3,
    randomReduction: function() {
        return Math.random()*0.2+0.52;
    },
    __init__: function(len, angle) {
        this.trunk = {
            len: len,
            angle: angle
        }
        if (len > this.branchLimit) {
            this.branches = [];

            this.branches.push(Object.create(Tree));
            this.branches[0].__init__(len*this.randomReduction(), 30 ); 
            this.branches.push(Object.create(Tree));
            this.branches[1].__init__(len*this.randomReduction(), -30 ); 
        }
    },
    draw : function() {
        line(0,0,0,-this.trunk.len);
        translate(0,-this.trunk.len);
        if(this.branches) {
            this.branches.forEach((branch)=>{
                push()
                rotate(radians(branch.trunk.angle));
                branch.draw()
                pop();
            })
        }
    }
}