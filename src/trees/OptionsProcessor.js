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

        /* processed Object should contain 
        * branchReduction : (function)
        * root : (Vector)
        * displacement: (Vector)
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