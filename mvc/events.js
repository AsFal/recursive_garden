let views = [LeftOptionsView, TopOptionsView, RightOptionsView, BottomOptionsView];

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
    view.submitHook.addEventListener("submit", function(event) {
      event.preventDefault();
      let form = findParentForm(event.target);
      let newOptions = makeOptionsFromForm(form);
      Model.forest.updateTree(newOptions);
        //Find the index from the name, or put the information in the html (most likely in the button)
    })
    
    // The first click makes the tree dissapear, but it does not thereafter reappear
    // For some reason the default tree settings are not being set
    view.visibilityHook.addEventListener("click", function(event){
        let form = findParentForm(event.target);
        let name = form.name;
        let options = makeOptionFromForm(form);
        console.log(options);
        if(Model.forest[name]) {
            Model.forest.deleteTree(options);
        }
        else {
            Model.forest.addTree(options)
            logRed("deleted");
        }
        // let index = Number(event.target.index);
    })
})

// This a functional motherfucka
function makeOptionFromForm(formHook) {
    // The way I formatted the controller, There should be three types of options
    // option classified divs with text input
    // Option classified divs with check inputs
    // the last element should be a submit button (the one that triggered the event)
    // This function needs to return an option object
    let options = {}
    options.name = formHook.name;
    [].forEach.call(formHook.children,(child)=>{
        if(child.classList.contains("input-option")) {
            childInput = findChildInput(child);
            let value = childInput.value;
            let name  = childInput.name;
            if(Number(value) != NaN)
                value = Number(value);
            options[name]=value;
        }
        else if(child.classList.contains("check-option")) {
            childInput = findChildInput(child);
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