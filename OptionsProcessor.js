var OptionsProcessor = {
    analyse: function(options) {

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
        this.processedOptions.displacement = createVector(options.trunkLength,0); /**\ */
        this.processedOptions.displacement.rotate(radians(options.direction));

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
                this.processedOptions.root = createVector(0, height-height/2);
                return 0;            
            case "top":
                this.processedOptions.root = createVector(width-width/2, 0);
                return 90;
            case "right":
                this.processedOptions.root = createVector(width, height-height/2);
                return 180;
            case "bottom":
                this.processedOptions.root = createVector(width-width/2, height);
                return -90;
            default:
                this.processedOptions.root = createVector(width-width/2, height);
                return -90;
        }
    }
}