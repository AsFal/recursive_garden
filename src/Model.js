export var Model = {
    currentView: null,
    previousView: null,
    // This is what decides the art that is displayed on the TV to the left
    canvasObject : null,
    __init__: function(initialView, canvasObject){
        this.currentView = initialView;
        this.canvasObject = canvasObject;
    }
    // need to maintain a disconnect between the controller and the aniamtion screen
}

export var changeViews = new Event("changeViews");

document.addEventListener("changeViews", ()=>{
    if(Model.previousView) {
        Model.previousView.toggleDisplay();
    }
    Model.currentView.toggleDisplay();
});