
// This is a Branch structure
export var Branch = {
    // begin and end are p5.js points
    __init__ : function(sk, begin, end, branchReduction, branchAngles, level=0){
        this.sk = sk;
        this.begin = begin;
        this.end = end;
        this.branchOutDirections = branchAngles;
        this.branchReduction = branchReduction; //(either random or static)
        this.level = level;
        this.final = this.level>7;
    },
    branchOut: function() {
        let newBranches = [];
        // Not going to work (Needs to be refactored)
        let dir = this.sk.createVector(0,0);
        dir.add(this.end);
        dir.sub(this.begin);
        // 
        dir.mult(this.branchReduction());

        let previousAngle = 0
        for (let index = 0; index < this.branchOutDirections.length; index++) {
            let angle = this.branchOutDirections[index]();
            angle -= previousAngle;
            previousAngle = angle;

            dir.rotate(this.sk.radians(angle));
            let newBranch = Object.create(Branch);
            // The sum of the end plus the displacement vector goes to the new end
            let branchStart = this.end;
            let branchEnd = this.sk.createVector(0,0);
            branchEnd.add(this.end);
            branchEnd.add(dir);

            newBranch.__init__(this.sk, branchStart, branchEnd, this.branchReduction, this.branchOutDirections, this.level + 1)
            newBranches.push(newBranch);
        }
        this.final = true;
        return newBranches;
    },
    show: function() {
        this.sk.line(this.begin.x, this.begin.y, this.end.x, this.end.y);
    }

}