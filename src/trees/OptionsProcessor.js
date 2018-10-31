/**
 * @file
 * 
 * A Options Object can have the following properties. These are split into two
 * categories: UserModAllowed and UserModDisallowed
 * UserModAllowed Options are ones that could be displayed on the canvas
 * UserModDisallowed are Options are ones that cannot be displayed on the canvas
 *
 *  UserModAllowed{
 *  @param {String} direction : converted to a number, the initial direction of the trunk
 *  @param {Vector} root : a p5 Vector that determines the root position
 *  @param {String} name : the name of the tree, used to set some defaults (notably root and direction)
 * 
 * 
 * }
 * UserModDisallowed {
 * @param {String} trunkLength : converted to a number, the length of the trunk
 * @param {String} complexity : converted to a number, will determine the branch reduction percentage
 * @param {Boolean} random : Determines if the branch reduction will be done randomly
 * @param {String} branchOutAngle : Determines the branch out angle
 * }
 * @todo
 * randomAngle : Changes the angle 
 * branchNumber : Change the number of branch number
 * randomBranchNumber: 
 * customTrunk: 
 * leaves:
 * color:
 * InProcess{
 * @param {Array[String]} branchAngles: An array of angles that determine the angle at which all of the branches branchout 
 * @param {Boolean} randomBranchAngle : Random Branch Out Angles for all branches
 * @param {String} numberOfBranches : Number of branches
 * @param {Boolean} branchEquality: Determines if trees must have the same number of branches on both sides
 * }
 * 
 */






export var OptionsProcessor = {
    analyse: function(sk, options) {
        this.sk = sk;
        this.processedOptions = {};
        // Will set a default starter angle and root position if specified
        let direction = this.setDefaultDirection(options.name); /**\ */ //default root is set inside the function
        if (options.direction)
            direction = options.direction

        // Set root position if specified
        if(options.root)
            this.processedOptions.root = options.root; /**\ */

        // This is the displaceent vector for angle = 0
        if(!options.trunkLength)
            options.trunkLength = 100;

        // Create the initial displacement (only useful thing) 
        this.processedOptions.displacement = this.sk.createVector(options.trunkLength,0); /**\ */
        this.processedOptions.displacement.rotate(sk.radians(direction));

        if(!options.complexity)
            options.complexity = 0
        let leftDelimiter = 0.4 + options.complexity * 0.05;

        if(!options.random) {
            this.random = false;
            let staticReduction = leftDelimiter + 0.1
            this.processedOptions.branchReduction = ()=>staticReduction; /**\ */
        }
        else {
            this.random = true;
            this.processedOptions.branchReduction = Helper.randomIntervalGenerator(leftDelimiter, leftDelimiter+0.2); /**\ */
        }


        let leftBranchRandomAngle = Helper.randomIntervalGenerator(-60, -20);
        let rightBranchRandomAngle = Helper.randomIntervalGenerator(20, 60);
       
        function wrapInFunction(x) {
            return ()=>x;
        }

        if(!options.randomBranchAngle) {
            if(!options.branchAngles) {
                let arr = [wrapInFunction(-30), wrapInFunction(30)];
                this.processedOptions.branchAngles = arr;
            }
            else {
                options.branchAngles.map(angle=>wrapInFunction(angle));
                this.processedOptions.branchAngles = options.branchAngles;
            }
        }
        else {
            if (!options.numberOfBranches || Number(options.numberOfBranches) == NaN)
                options.numberOfBranches = 2;
            options.numberOfBranches = Number(options.numberOfBranches);
            if(options.numberOfBranches > 6)
                options.numberOfBranches = 6;
            this.processedOptions.branchAngles = [];
            for (let index = 0; index < options.numberOfBranches; index++) {
                let decider = Math.random();
                if (options.branchEquality && index < options.numberOfBranches/2)
                    this.processedOptions.branchAngles.push(leftBranchRandomAngle);
                else if(options.branchEquality && index >= options.numberOfBranches/2)
                    this.processedOptions.branchAngles.push(rightBranchRandomAngle);
                else if(decider < 0.5)
                    this.processedOptions.branchAngles.push(leftBranchRandomAngle);
                else if(decider >= 0,5)
                    this.processedOptions.branchAngles.push(rightBranchRandomAngle);
                else
                    this.processedOptions.branchAngles.push(rightBranchRandomAngle);  
            }
        }


        /* processed Object should contain 
        * branchReduction : (function)
        * root : (Vector)
        * displacement: (Vector)
        * branchAngles : (Array[function])
        */
        return this.processedOptions;
    },
    setDefaultDirection: function(defaultName){
        switch (defaultName) {
            case "left":
                this.processedOptions.root = this.sk.createVector(0, this.sk.height-this.sk.height/2);
                return 0;            
            case "top":
                this.processedOptions.root = this.sk.createVector(this.sk.width-this.sk.width/2, 0);
                return 90;
            case "right":
                this.processedOptions.root = this.sk.createVector(this.sk.width, this.sk.height-this.sk.height/2);
                return 180;
            case "bottom":
                this.processedOptions.root = this.sk.createVector(this.sk.width-this.sk.width/2, this.sk.height);
                return -90;
            default:
                this.processedOptions.root = this.sk.createVector(this.sk.width-this.sk.width/2, this.sk.height);
                return -90;
        }
    }
}