import * as Generators from "./html_generators";
// I will need to make changes above accordingly

export var ControllerView = {
    __init__: function(name, inputOptions, checkOptions) {
        this.name = name;
        // Eventually have the fillView create the container and shit
        this.hook = document.querySelector("#" + name);
        this.fillView(inputOptions, checkOptions);
        this.formHook = this.findFormHook(this.hook);
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
        this.headerHook.classList.toggle("on");
    },
    findVisibilityHook: function(viewHook) {
        // view - form - option div - label - input
        return viewHook.children[0].children[0].children[0].children[0];
    },
    findFormHook: function(viewHook) {
        // view - form - submit (lastchild)
        return viewHook.lastElementChild;
    },
    fillView(inputNames, checkNames) {
        let container = this.hook;
        let form = document.createElement("form");
        form.setAttribute("name", this.name);
        form.appendChild(Generators.generateCheckOption("visibility"));
        // Maybe put a seperation
        inputNames.forEach(inputName => {
            form.appendChild(Generators.generateInputOption(inputName));
        });
        checkNames.forEach(checkName => {
            form.appendChild(Generators.generateCheckOption(checkName))
        })
        form.appendChild(Generators.submitButton("Apply!"));
        container.appendChild(form);
    }
}

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