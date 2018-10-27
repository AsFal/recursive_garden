// options
// root: sets a point as the root of the tree, defaults at createVector(width-width/2, height)
// direction: sets a general direction for the tree (default up)

var VectorTree = {
    __init__: function(options){

        // haveTheTreeOptionObjectCreateAObjectPackage
        // Have a method to dpkg options
        // Have a basic initi that sets the function
        let optionsProcessor = Object.create(OptionsProcessor);
        let processedOptions = optionsProcessor.analyse(options);

        let firstNode = p5.Vector.add(processedOptions.root, processedOptions.displacement);
        // let firstNode = createVector(width-width/2, height-100)
        let trunk  = Object.create(Branch);
        trunk.__init__(processedOptions.root, firstNode, processedOptions.branchReduction);
        this.treeArray = [trunk];
        console.log(this.treeArray);
    },
    branchOut: function() {
        this.treeArray.forEach((branch)=>{
            if(!branch.final){
                // Hopefully the forEach is smart enough to stop
                branch.branchOut().forEach((newBranch)=>{
                    this.treeArray.push(newBranch);
                })
            }
        })

        // console.log(this.treeArray);
    },
    show: function() {
        this.treeArray.forEach((branch)=>{
            branch.show()
        })
    }
}


// Storing a point in p5.js
var Branch = {
    // begin and end are p5.js points
    __init__ : function(begin, end, branchReduction, level=0){
        this.begin = begin;
        this.end = end;
        this.branchOutDirections = [30,-30];
        this.branchReduction = branchReduction; //(either random or static)
        this.level = level;
        this.final = this.level>7;
    },
    branchOut: function() {
        newBranches = [];

        let dir = p5.Vector.sub(this.end, this.begin);
        dir.mult(this.branchReduction());
        let newBranch;
        let angle;

        for (let index = 0; index < this.branchOutDirections.length; index++) {
            angle = this.branchOutDirections[index];
            if(index !=0){
                angle -= this.branchOutDirections[index-1];
            }
            dir.rotate(radians(angle));
            newBranch = Object.create(Branch);
            // The sum of the end plus the displacement vector goes to the new end
            newBranch.__init__(this.end, p5.Vector.add(this.end, dir), this.branchReduction, this.level + 1)
            newBranches.push(newBranch);
        }
        this.final = true;
        return newBranches;
    },
    show: function() {
        line(this.begin.x, this.begin.y, this.end.x, this.end.y);
    }

}