import {Model, changeViews} from "./Model.js";
import {ControllerView} from "./views.js";
import {Forest} from "./trees/Forest.js";
// import {ForestOptions} from "./ForestOptions";
import * as p5 from 'p5';

// the views need to be initialized after the html is constructed (will be in fill_views page)
var LeftOptionsView = Object.create(ControllerView);
var TopOptionsView = Object.create(ControllerView);
var RightOptionsView = Object.create(ControllerView);
var BottomOptionsView = Object.create(ControllerView);

// TODO: Eventually pull this from json
let inputOptions = ["trunkLength", "complexity"];
let checkOptions = ["random"];

LeftOptionsView.__init__("left", inputOptions, checkOptions);
TopOptionsView.__init__("top", inputOptions, checkOptions);
RightOptionsView.__init__("right", inputOptions, checkOptions);
BottomOptionsView.__init__("bottom", inputOptions, checkOptions);

// Init the Model

var forest = Object.create(Forest);
let views = [LeftOptionsView, TopOptionsView, RightOptionsView, BottomOptionsView];
Model.__init__(LeftOptionsView, forest);

// Then add the events here by connecting with the model's events

// Should the Model have a copy of the views and if so why
views.forEach((view)=>{
    view.headerHook.addEventListener("click", function(){
        let viewInnerText;
        if(event.target.classList.contains("content"))
            viewInnerText = event.target.innerText;
        else
            viewInnerText = event.target.children[0].innerText;

        let newView = selectView(viewInnerText);
        if(Model.currentView != newView) {
            Model.previousView = Model.currentView;
            Model.currentView = newView;
            document.dispatchEvent(changeViews);
        }
    });
    // Needs to be tested
    view.formHook.addEventListener("submit", function(event) {
      event.preventDefault();
      event.stopPropagation();
      let form = findParentForm(event.target);
      let newOptions = makeOptionsFromForm(form);
      Model.canvasObject.updateTree(newOptions);
        //Find the index from the name, or put the information in the html (most likely in the button)
    })
    
    view.visibilityHook.addEventListener("click", function(event){
        let form = findParentForm(event.target);
        let name = form.name;
        let options = makeOptionsFromForm(form);
        console.log(options);
        console.log(Model);
        console.log(Model.canvasObject);
        if(Model.canvasObject.containsTree(name)) {
            Model.canvasObject.removeTree(options);
            logRed("shit is being deleted")
        }
        else {

            Model.canvasObject.addTree(options)
            logRed("shit is being added");
        }
        // let index = Number(event.target.index);
    })
})



/** 
 * @todo: Very much Helper functions that should be sent somewhere else  
 * */
// =============================================================
// This a functional motherfucka
function makeOptionsFromForm(formHook) {
    // The way I formatted the controller, There should be three types of options
    // option classified divs with text input
    // Option classified divs with check inputs
    // the last element should be a submit button (the one that triggered the event)
    // This function needs to return an option object
    let options = {}
    options.name = formHook.name;
    [].forEach.call(formHook.children,(child)=>{
        if(child.classList.contains("input-option")) {
            let childInput = findChildInput(child);
            let value = childInput.value;
            let name  = childInput.name;
            if(Number(value) != NaN)
                value = Number(value);
            options[name]=value;
        }
        else if(child.classList.contains("check-option")) {
            let childInput = findChildInput(child);
            let name = childInput.name;
            let isChecked = childInput.checked;
            options[name]=isChecked;          
        }
    })
    return options;  
}

// Needs to be changed
function selectView(viewInnerText) {
    switch (viewInnerText) {
        case "Left":
            return LeftOptionsView;
        case "Top":
            return TopOptionsView;
        case "Right":
            return RightOptionsView;
        case "Bottom":
            return BottomOptionsView;
        default:
            break;
    }
}


// This a functional motherfucker
// Checks all children for an input element
// Could be generalized
function findChildElementByTag(tagName, htmlElement) {
    for (let index = 0; index < htmlElement.children.length; index++) {
        if(htmlElement.children[index].tagName == tagName)
            return htmlElement.children[index];
        else
            return findChildElementByTag(tagName, htmlElement.children[index]);
    }
}

var findChildInput = findChildElementByTag.bind({},"INPUT");

function findParentForm(inputHook) {
    if(inputHook.tagName == "FORM")
        return inputHook;
    else
        return findParentForm(inputHook.parentElement);
}

// =======================================
// Sketch init
// ========================================



let s = (sk) => {
   
    sk.setup= function() {

        sk.createCanvas(400,400);
        let ForestOptions = [
            {
              name: "right",
              root: sk.createVector(sk.width, sk.height-sk.height/2),
              direction : 180,
              complexity: 2,
              trunkLength: 60,
              random: true
            },
            {
              name: "bottom",
              root: sk.createVector(sk.width-sk.width/2, sk.height),
              direction : -80,
              complexity: 2,
              trunkLength: 60,
              random: false
            },
            { 
              name: "left",
              root: sk.createVector(0, sk.height-sk.height/2),
              direction :0,
              complexity: 3,
              trunkLength: 60,
              random: false
            },
            {
              name: "top",
              root: sk.createVector(sk.width-sk.width/2, 0),
              direction : 90,
              complexity: 1,
              trunkLength: 100,
              random: false
            }
          ]
          
        sk.frameRate(30);
        forest.__init__(sk, ForestOptions);
    };
      
    sk.mousePressed = function() {
        let trees = Object.values(forest.trees);
        trees.forEach((tree)=>{tree.branchOut()})
    };
      
      
    sk.draw = function() {
      
        sk.background(51);
        sk.stroke(255);
        forest.show();
      
    };
}

const P5 = new p5(s);


