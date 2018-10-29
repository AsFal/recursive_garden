import {Branch} from "./Branch.js";
import {OptionsProcessor} from "./OptionsProcessor.js";


// options
// root: sets a point as the root of the tree, defaults at createVector(width-width/2, height)
// direction: sets a general direction for the tree (default up)

export var VectorTree = {
    __init__: function(sk, options){
        this.sk = sk;
        // haveTheTreeOptionObjectCreateAObjectPackage
        // Have a method to dpkg options
        // Have a basic initi that sets the function
        let optionsProcessor = Object.create(OptionsProcessor);
        let processedOptions = optionsProcessor.analyse(this.sk, options);
        let firstNode = sk.createVector(0,0);
        firstNode.add(processedOptions.root);
        firstNode.add(processedOptions.displacement);

        // let firstNode = createVector(width-width/2, height-100)
        let trunk  = Object.create(Branch);
        trunk.__init__(sk, processedOptions.root, firstNode, processedOptions.branchReduction);
        this.treeArray = [trunk];
        // console.log(this.treeArray);
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
