// All views have
// A form with a name that matches the one that access the tree in the Forest object
// A visibility check option named "visibility"

// function fillView(view, name, inputNames, checkNames) {
//     console.log(checkNames);
//     let container = view.hook;
//     console.log(inputNames);
//     let form = document.createElement("form");
//     form.setAttribute("name", name);
//     form.appendChild(generateCheckOption("visibility"));
//     // Maybe put a seperation
//     inputNames.forEach(inputName => {
//         form.appendChild(generateInputOption(inputName));
//     });
//     console.log(checkNames);
//     checkNames.forEach(checkName => {
//         form.appendChild(generateCheckOption(checkName))
//     })
//     form.appendChild(submitButton("Apply!"));
//     container.appendChild(form);
// }

// get that shit from JSON


// fillView(LeftOptionsView,"left", leftInputOptions, leftCheckOptions)
// fillView(LeftOptionsView,"left", leftInputOptions, leftCheckOptions)
// fillView(LeftOptionsView,"left", leftInputOptions, leftCheckOptions)
// fillView(LeftOptionsView,"left", leftInputOptions, leftCheckOptions)




// var LeftOptionsView = Object.create(ControllerView);
// var TopOptionsView = Object.create(ControllerView);
// var RightOptionsView = Object.create(ControllerView);
// var BottomOptionsView = Object.create(ControllerView);