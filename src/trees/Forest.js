import {VectorTree} from "./VectorTree.js"

// Not in application yet, but just __init__ in sketch with the options array
export var Forest = {
    // need to have the basic orientation based on the name (direction and root)
    // Add these default in trees
    __init__: function(sk,optionsObjects) {
        this.sk = sk;
        this.trees = {};
        optionsObjects.forEach((options)=>{
            this.addTree(options);
            // Bad coupling
            let name = options.name;
            let form = document.forms[name];
            console.log(options);
            let visibilityHook = form.children[0].children[0].children[0];
            visibilityHook.checked = true;
            // Very Bad coupling
        })
    },
    addTree: function(options){
        console.log("===================")
        console.log(options);
        let tree = Object.create(VectorTree);
        tree.__init__(this.sk, options);
        console.log(this.trees);
        console.log("===================")
        this.trees[options.name] = tree;
    },
    removeTree: function(options) {
        let treeName = options.name;
        delete this.trees[treeName];
        logGreen("deleted now");
    },
    // Needs to be modified
    updateTree: function(newOptions) {
        if(this.trees[newOptions.name])
            this.trees[newOptions.name].__init__(this.sk, newOptions);
        else
            logRed("No Tree has been found, tree is not in range");
    },
    show: function() {
        let trees = Object.values(this.trees);
        trees.forEach((tree)=>{
            tree.show();
        });
    },
    containsTree(name) {
        return this.trees[name];
    }
}