var Model = {
    currentView: LeftOptionsView,
    previousView: null,
    forest : forest
    // need to maintain a disconnect between the controller and the aniamtion screen
}

var changeViews = new Event("changeViews");

document.addEventListener("changeViews", ()=>{
    if(Model.previousView) {
        Model.previousView.toggleDisplay();
        Model.previousView.headerHook.classList.toggle("on");
    }
    Model.currentView.toggleDisplay();
    Model.currentView.headerHook.classList.toggle("on"); 
});