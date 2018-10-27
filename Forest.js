// Not in application yet, but just __init__ in sketch with the options array
var Forest = {
    // need to have the basic orientation based on the name (direction and root)
    // Add these default in trees
    __init__: function(optionsObjects) {
        this.trees = {};
        optionsObjects.forEach((options)=>{
            this.addTree(options);
            // Bad coupling
            let name = options.name;
            let form = document.forms[name];
            console.log(options);
            
            let visibilityHook = form.children[0].children[0].children[0];
            visibilityHook.checked = true;
        })
    },
    addTree: function(options){
        console.log("===================")
        console.log(options);
        let tree = Object.create(VectorTree);
        tree.__init__(options);
        console.log(this.trees);
        console.log("===================")
        this.trees[options.name] = tree;
    },
    removeTree: function(options) {
        let treeName = options.name;
        delete this.trees[treeName];
        logGreen("deleted");
    },
    // Needs to be modified
    updateTree: function(newOptions) {
        if(trees.length > treeIndex && treeIndex > 0)
            this.trees[newOptions.name].__init__(newOptions);
        else
            logRed("No Tree has been found, tree is not in range");
    },
    show: function() {
        let trees = Object.values(this.trees);
        trees.forEach((tree)=>{
            tree.show();
        });
    }
}