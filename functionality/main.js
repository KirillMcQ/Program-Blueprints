/*
By: Kirill McQuillin
TODO:
  1. See the struct button even handler for info (around line 187, give or take).
IDEAS:
  1. Implement system to check if any submissions are null. If so, display error message with drop down
  2. When the user fist opens the site, show a modal that can only be closed once they select what language they want to generate in (C++ only for now, ideas for Java later).
  3. Extending question 2, when the user picks a certain language to generate, update the site accordingly for that language. E.g. if Java is picked, remove the 'Create Struct' button.
  4. Add a button to show a modal with instructions on how to use the website.
  5. Connect each child to div to its parent by a dynamic line.
*/


var generatedCode = "";
var classNameCode = {};
var classVariables = {};
var structNameCode = {};
var variableName = "";
var amtVars = 0;

document.getElementById("create-box").addEventListener("click", function() {
  amtVars = 0;
  var methodCount = 0;
  let box = document.createElement("div");
  box.classList.add("box");
  let title = document.createElement("h2");
  title.innerHTML = "Class";
  box.appendChild(title);
  let classTitle = document.createElement('input');
  classTitle.classList.add('class-name-form');
  let classTitleBtn = document.createElement('button');
  classTitleBtn.innerText = "Set Class Name";
  classTitleBtn.classList.add('class-name-btn');
  box.appendChild(classTitle);
  box.appendChild(classTitleBtn);
  document.getElementById("box-container").appendChild(box);
  let createSubclassButton = document.createElement("button");
  createSubclassButton.innerHTML = "Add Method";
  box.appendChild(createSubclassButton);
  let createInstanceVariable = document.createElement('button');
  createInstanceVariable.classList.add('add-variable');
  createInstanceVariable.innerHTML = "Add instance variable";
  box.appendChild(createInstanceVariable);

  box.addEventListener("mousedown", startDrag);
  box.addEventListener("mousemove", drag);
  box.addEventListener("mouseup", endDrag);
  box.addEventListener("mouseleave", endDrag);

  let offset = [0, 0];
  let isDown = false;

  function startDrag(e) {
    isDown = true;
    offset = [
      this.offsetLeft - e.clientX,
      this.offsetTop - e.clientY
    ];
  }

  function drag(e) {
    if (!isDown) return;
    e.preventDefault();
    this.style.left = (e.clientX + offset[0]) + 'px';
    this.style.top = (e.clientY + offset[1]) + 'px';
  }

  function endDrag(e) {
    isDown = false;
  }


  createInstanceVariable.addEventListener('click', function() {
    methodCount = 0;
    let instanceVar = document.createElement('div');
    instanceVar.classList.add('instance-var');
    let instanceTitle = document.createElement('h2');
    instanceTitle.innerText = `Variable`;
    instanceVar.append(instanceTitle);
    let varName = document.createElement('input');
    varName.classList.add('varName-form');
    varName.placeholder = "Set variable name";
    instanceVar.append(varName);
    let varNameBtn = document.createElement('button');
    varNameBtn.innerText = "Set Variable Name";
    varNameBtn.classList.add('var-name-btn');
    instanceVar.append(varNameBtn);

    let varType = document.createElement('input');
    varType.placeholder = 'Specify variable type';
    varType.classList.add('variable-type-form');
    let varTypeBtn = document.createElement('button');
    varTypeBtn.innerText = "Set variable type";
    varTypeBtn.classList.add('method-type-btn');
    instanceVar.appendChild(varType);
    instanceVar.appendChild(varTypeBtn);

    document.getElementById("box-container").appendChild(instanceVar);
    instanceVar.style.left = box.offsetLeft + box.offsetWidth + 10 + 'px';
    instanceVar.style.top = box.offsetTop + 'px';

    instanceVar.addEventListener("mousedown", startDrag);
    instanceVar.addEventListener("mousemove", drag);
    instanceVar.addEventListener("mouseup", endDrag);
    instanceVar.addEventListener("mouseleave", endDrag);

    varNameBtn.addEventListener('click', function() {
      variableName = varName.value;
      instanceTitle.innerText = `Variable ${variableName}`;
    });

    varTypeBtn.addEventListener('click', function() {
      if (amtVars === 0) {
        classNameCode[classTitle.value] += `\n\tprivate: \n\t\t${varType.value} ${variableName};\n`;
        amtVars++;
      } else {
        classNameCode[classTitle.value] += `\n\t\t${varType.value} ${variableName};\n`;
      }
    });
  });
  createSubclassButton.addEventListener("click", function() {
    let subBox = document.createElement("div");
    subBox.classList.add("subbox");
    let subTitle = document.createElement("h2");
    subTitle.innerText = `Method`;
    subBox.append(subTitle);
    let methodTitle = document.createElement('input');
    methodTitle.classList.add('method-name-form');
    methodTitle.placeholder = 'Set method name'
    let methodTitleBtn = document.createElement('button');
    methodTitleBtn.innerText = "Set Method Name";
    methodTitleBtn.classList.add('method-name-btn');
    subBox.appendChild(methodTitle);
    subBox.appendChild(methodTitleBtn);
    let returnType = document.createElement('input');
    returnType.placeholder = 'Specify return type';
    returnType.classList.add('method-return-type-form');
    let returnTypeBtn = document.createElement('button');
    returnTypeBtn.innerText = "Set return type";
    returnTypeBtn.classList.add('method-return-type-btn');
    subBox.appendChild(returnType);
    subBox.appendChild(returnTypeBtn);

    document.getElementById("box-container").appendChild(subBox);
    subBox.style.left = box.offsetLeft + box.offsetWidth + 10 + 'px';
    subBox.style.top = box.offsetTop + 'px';

    subBox.addEventListener("mousedown", startDrag);
    subBox.addEventListener("mousemove", drag);
    subBox.addEventListener("mouseup", endDrag);
    subBox.addEventListener("mouseleave", endDrag);

    methodTitleBtn.addEventListener('click', function() {
      console.log(methodTitle.value);
      if (methodTitle.value === classTitle.value) {
        subTitle.innerText = `Constructor for class ${classTitle.value}`;
      } else {
        subTitle.innerText = `Method ${methodTitle.value}`;
      }
    });

    returnTypeBtn.addEventListener('click', function() {
      console.log(returnType.value);
      if (methodCount === 0) {
        classNameCode[classTitle.value] += `\tpublic:\n\t\t${returnType.value} ${methodTitle.value}() {\n\n\t\t}`;
        methodCount++;
        amtVars = 0;
      } else {
        classNameCode[classTitle.value] += `\n\t\t${returnType.value} ${methodTitle.value}() {\n\n\t\t}`;
        amtVars = 0;
      }
    });
  });

  classTitleBtn.addEventListener("click", function() {
    console.log(classTitle.value);
    // generatedCode = `class ${classTitle.value} {\n\t`
    title.innerHTML = `Class ${classTitle.value}`;
    classNameCode[classTitle.value] = `\nclass ${classTitle.value} {\n`
  });


});

var createStructBtn = document.getElementById('create-struct');

createStructBtn.addEventListener('click', () => {
  // TODO: allow user to add a new variable to a struct, as many as they want tand then add that to the hashmap and generate the code on modal open.
  let structBox = document.createElement('div');
  structBox.classList.add('structBox');
  let structBoxTitle = document.createElement('h2');
  structBoxTitle.classList.add('structBoxTitle');
  structBoxTitle.innerText = 'Struct';
  structBox.appendChild(structBoxTitle);
  let structNameForm = document.createElement('input');
  structNameForm.classList.add('structNameForm');
  structBox.appendChild(structNameForm);
  document.getElementById('box-container').appendChild(structBox);
  let structNameBtn = document.createElement('button');
  structNameBtn.innerText = "Set struct name";
  structNameBtn.classList.add('structNameBtn');
  structBox.appendChild(structNameBtn);

  structBox.addEventListener("mousedown", startDrag);
  structBox.addEventListener("mousemove", drag);
  structBox.addEventListener("mouseup", endDrag);
  structBox.addEventListener("mouseleave", endDrag);

  let offset = [0, 0];
  let isDown = false;

  function startDrag(e) {
    isDown = true;
    offset = [
      this.offsetLeft - e.clientX,
      this.offsetTop - e.clientY
    ];
  }

  function drag(e) {
    if (!isDown) return;
    e.preventDefault();
    this.style.left = (e.clientX + offset[0]) + 'px';
    this.style.top = (e.clientY + offset[1]) + 'px';
  }

  function endDrag(e) {
    isDown = false;
  }

  structNameBtn.addEventListener('click', () => {
    structBoxTitle.innerText = `Struct ${structNameForm.value}`;
  });
});


// MODAL FOR CODE GENERATION
var modal = document.getElementById("myModal");

var btn = document.getElementById("myBtn");

var modalContent = document.querySelector('.modal-content');


btn.onclick = function() {
  modal.style.display = "block";
  modalContent.innerText = "";
  console.log(classNameCode);
  if (Object.keys(classNameCode).length === 0) {
    modalContent.innerText = "No Code Yet";
  }
  for (var key in classNameCode) {
    var codeToAppend = `${classNameCode[key]} \n}`;
    console.log(codeToAppend);
    modalContent.innerText += codeToAppend;
  }
}


window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}