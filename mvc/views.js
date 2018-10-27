var ControllerView = {
    __init__: function(name, inputOptions, checkOptions) {
        this.name = name;
        // Eventually have the fillView create the container and shit
        this.hook = document.querySelector("#" + name);
        this.fillView(inputOptions, checkOptions);
        this.submitHook = this.findSubmitHook(this.hook);
        this.visibilityHook = this.findVisibilityHook(this.hook);
        this.headerHook =document.querySelector("#header-" + name); 
    },
    toggleDisplay : function(){
        if (this.hook.style.display == "none") {
            this.hook.style.display = "block";
        } 
        else {
            this.hook.style.display = "none";
        }
    },
    findVisibilityHook: function(viewHook) {
        // view - form - option div - label - input
        return viewHook.children[0].children[0].children[0].children[0];
    },
    findSubmitHook: function(viewHook) {
        // view - form - submit (lastchild)
        return viewHook.children[0].lastElementChild;
    },
    fillView(inputNames, checkNames) {
        let container = this.hook;
        let form = document.createElement("form");
        form.setAttribute("name", this.name);
        form.appendChild(generateCheckOption("visibility"));
        // Maybe put a seperation
        inputNames.forEach(inputName => {
            form.appendChild(generateInputOption(inputName));
        });
        checkNames.forEach(checkName => {
            form.appendChild(generateCheckOption(checkName))
        })
        form.appendChild(submitButton("Apply!"));
        container.appendChild(form);
    }
}

// the views need to be initialized after the html is constructed (will be in fill_views page)
var LeftOptionsView = Object.create(ControllerView);
var TopOptionsView = Object.create(ControllerView);
var RightOptionsView = Object.create(ControllerView);
var BottomOptionsView = Object.create(ControllerView);

// TODO: Eventually pull this from json
let leftInputOptions = ["trunkLength", "complexity"];
let leftCheckOptions = ["visible", "random"];

LeftOptionsView.__init__("left", leftInputOptions, leftCheckOptions);
TopOptionsView.__init__("top", [], []);
RightOptionsView.__init__("right", [], []);
BottomOptionsView.__init__("bottom", [], []);

// ===================
// Legacy Code
// ===================

// function toggleDisplay() {
//     if (this.hook.style.display == "none") {
//         this.hook.style.display = "block";
//     } 
//     else {
//         this.hook.style.display = "none";
//     }
// }

// function findVisibilityHook(viewHook) {
//     // view - form - option div - label - input
//     return viewHook.children[0].children[0].childre[0].children[0];
// }

// function findSubmitHook(viewHook) {
//     // view - form - submit (lastchild)
//     return viewHook.children[0].lastElementChild;
// }

// LeftOptionsView = {
//     hook: document.querySelector("#left"),
//     submitHook: findSubmitHook(this.hook),
//     visibilityHook: findVisibilityHook(this.hook),
//     headerHook : document.querySelector("header > div:nth-of-type(1)"),
//     toggleDisplay: function(){
//         toggleDisplay.call(this);
//     }
// }

// TopOptionsView = {
//     hook: document.querySelector("#top"),
//     submitHook: findSubmitHook(this.hook),
//     visibilityHook: findVisibilityHook(this.hook),
//     headerHook : document.querySelector("header > div:nth-of-type(2)"),
//     toggleDisplay: function() {
//         toggleDisplay.call(this);
//     }
// }

// RightOptionsView = {
//     hook: document.querySelector("#right"),
//     submitHook: findSubmitHook(this.hook),
//     visibilityHook: findVisibilityHook(this.hook),
//     headerHook : document.querySelector("header > div:nth-of-type(3)"),
//     toggleDisplay: function() {
//         toggleDisplay.call(this);
//     }
// }

// BottomOptionsView = {
//     hook: document.querySelector("#bottom"),
//     submitHook: findSubmitHook(this.hook),
//     visibilityHook: findVisibilityHook(this.hook),
//     headerHook : document.querySelector("header > div:nth-of-type(4)"),
//     toggleDisplay: function() {
//         toggleDisplay.call(this);
//     }
// }