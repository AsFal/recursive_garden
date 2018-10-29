// make an html generator for an option that has
// Label input apply
// call it inputOption

function makeClassifiedDiv(className) {
    let div = document.createElement("div");
    div.classList.add(className);
    return div;
}

export function generateInputOption (inputName) {
    let option = makeClassifiedDiv("option");
    option.classList.add("input-option");
    let label = document.createElement("label");
    let input = document.createElement("input");
    input.setAttribute("type","text");
    input.setAttribute("name", inputName);
    label.innerText = inputName;
    label.appendChild(input);
    option.appendChild(label);
    return option;

}

export function generateCheckOption (checkName) {
    let check = makeClassifiedDiv("option");
    check.classList.add("check-option");
    let label = document.createElement("label");
    let checkBox = document.createElement("input");
    checkBox.setAttribute("type","checkbox");
    checkBox.setAttribute("name", checkName);
    label.innerText = checkName;
    label.appendChild(checkBox);
    check.appendChild(label);
    return check;
}

export function submitButton(innerText) {
    let button = document.createElement("button");
    button.setAttribute("type", "submit");
    button.innerText = innerText;
    return button;
}
