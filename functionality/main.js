/*
By: Kirill McQuillin
TODO:
  1. Why don't any of the buttons work when I un-comment the view blocks code in HTML and JS files??
  2. Finish the View Blocks Div. Should show each block.
IDEAS:
  1. Make a page to be able to run all of the user's saved codes by redirecting to a c++ compiler with their code embedded in that compiler page.
*/

// const viewBlocksBtn = document.querySelector(".btn");
// const viewBlocksDiv = document.querySelector(".viewBlocks");

// var didClick = 0;

// viewBlocksBtn.addEventListener('click', () => {
//   // I'm sorry.
//   if (didClick == 0){
//     viewBlocksBtn.style.right = "260px";
//     viewBlocksDiv.style.display = "block";
//     didClick = 1;
//   } else {
//     viewBlocksBtn.style.right = "0px";
//     viewBlocksDiv.style.display = "none";
//     didClick = 0;
//   }
// });


console.log(JSON.parse(localStorage.getItem("pastCode")));

const saveCodeBtn = document.getElementById("saveCode");

const modalFirst = document.querySelector(".modalFirst");
const closeButton = document.querySelector(".close-button");

function toggleModal() {
    modalFirst.classList.toggle("show-modal");
}

function windowOnClick(event) {
    if (event.target === modalFirst) {
        toggleModal();
    }
}

// init localstorage pastcode aray if doesnt exist already
if (! localStorage.getItem("pastCode")) {
  var pastCodeArr = [];
  localStorage.setItem("pastCode", JSON.stringify(pastCodeArr));
}

// **************Showing instruction modal if user is first time visiting***********************
if (! localStorage.noFirstVisit) {
  modalFirst.classList.add("show-modal");
  closeButton.addEventListener("click", toggleModal);
  window.addEventListener("click", windowOnClick);
  localStorage.noFirstVisit = "1";
}
//*****************END VISIT CHECK**************

var clearSavedCode = document.getElementById("resetSavedCode");
clearSavedCode.addEventListener('click', () => {
  var pastCodeArr = [];
  localStorage.setItem("pastCode", JSON.stringify(pastCodeArr));
});

// Past Code Modal
var modalPast = document.getElementById("myModalPastCode");

var btn = document.getElementById("past-code");

var span = document.getElementsByClassName("close")[0];

var modalPastContent = document.querySelector(".modal-past-content");

var innerCodeContent = document.querySelector(".innerModalContent");

btn.onclick = function() {
  modalPast.style.display = "block";
  if (JSON.parse(localStorage.getItem("pastCode")).length == 0){
    innerCodeContent.innerHTML = "No past code found.";
  } else {
    innerCodeContent.innerText="";
    var pCodeArr = JSON.parse(localStorage.getItem("pastCode"));
    for (var j in pCodeArr) {
      innerCodeContent.innerText+=`\n\n--------Start of code section--------\n\n`;
      innerCodeContent.innerText += pCodeArr[j];
      console.log(pCodeArr[j]);
      var hr = document.createElement('hr');
      innerCodeContent.innerText+=`\n\n--------End of code section--------\n\n\n`;
    }
  }
}

span.onclick = function() {
  modalPast.style.display = "none";
}

window.onclick = function(event) {
  if (event.target == modalPast) {
    modalPast.style.display = "none";
  }
}

var generatedCode = "";
var classNameCode = {};
var classVariables = {};
var structNameCode = {};
var javaNameCode = {};
var variableName = "";
var amtVars = 0;
var classNames = [];

// Checking selected language
var dropDown = document.getElementById('language');
console.log(dropDown.value);

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

  let lineBreak = document.createElement('br');
  let lineBreak2 = document.createElement('br');
  box.appendChild(lineBreak2);
  let checkBox = document.createElement('input');
  checkBox.name = "checkBox";
  checkBox.id = "checkBox;"
  checkBox.type = "checkbox";
  let labelForBox = document.createElement('label');
  labelForBox.innerText = "Extend class: ";
  labelForBox.for = "checkBox";
  if (classNames.length > 0) {
    box.appendChild(labelForBox);
    box.appendChild(checkBox);
  }
  
  box.appendChild(lineBreak);
  let extendDropdown = document.createElement('select');
  if (classNames.length > 0) {
    console.log("Pick to extend");
    for (let i = 0; i < classNames.length; i++) {
      let newOption = document.createElement('option');
      newOption.text = classNames[i];
      extendDropdown.add(newOption);
    }
    box.appendChild(extendDropdown);
  }

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
      instanceTitle.innerText = `${varType.value} Variable ${variableName}`;
      if (amtVars === 0) {
        classNameCode[classTitle.value] += `\n\tprivate: \n\t\t${varType.value} ${variableName};\n`;

        javaNameCode[classTitle.value] += `\n    private ${varType.value} ${variableName};`;
        console.log(javaNameCode[classTitle.value]);
        amtVars++;
      } else {
        classNameCode[classTitle.value] += `\n\t\t${varType.value} ${variableName};\n`;
        javaNameCode[classTitle.value] += `\n    private ${varType.value} ${variableName};`;
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
        javaNameCode[classTitle.value] += `\n    public ${returnType.value} ${methodTitle.value}() {\n\n\t}`;
        console.log(javaNameCode[classTitle.value]);
        methodCount++;
        amtVars = 0;
      } else {
        classNameCode[classTitle.value] += `\n\t\t${returnType.value} ${methodTitle.value}() {\n\n\t\t}`;
        javaNameCode[classTitle.value] += `\n    public ${returnType.value} ${methodTitle.value}(){\n\n    }`;
        console.log(javaNameCode[classTitle.value]);
        amtVars = 0;
      }
    });
  });

  classTitleBtn.addEventListener("click", function() {
    console.log(classTitle.value);
    // generatedCode = `class ${classTitle.value} {\n\t`
    if (checkBox.checked) {
      if (!classTitle.value){
        alert("Class Title cannot be null!");
      }else {
        title.innerHTML = `Class ${classTitle.value} extends ${extendDropdown.value}`;
        classNameCode[classTitle.value] = `\nclass ${classTitle.value} : public ${extendDropdown.value} {\n`;
        javaNameCode[classTitle.value] = `\n public class ${classTitle.value} extends ${extendDropdown.value}{\n`;
      }

    } else {
      if (!classTitle.value){
        alert("Class Title cannot be null!");
      } else {
        title.innerHTML = `Class ${classTitle.value}`;
        classNames.push(classTitle.value);
        console.log(classNames);
        classNameCode[classTitle.value] = `\nclass ${classTitle.value} {\n`;
        javaNameCode[classTitle.value] = `\n public class ${classTitle.value} {\n`;      
      }

    }

  });


});

var createStructBtn = document.getElementById('create-struct');

createStructBtn.addEventListener('click', () => {
  var nameCount = 0;
  var dTypeCount = 0;
  var amtStructMembers = 0;
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
  // Create the attribute div for each var attr of the struct
  let structAtrBtn = document.createElement('button');
  structAtrBtn.innerText = "Add a struct member";
  structBox.appendChild(structAtrBtn);

  structNameBtn.addEventListener('click', () => {
    structBoxTitle.innerText = `Struct ${structNameForm.value}`;
  });

  // When they create a new instance variable div
  structAtrBtn.addEventListener('click', () => {
    nameCount = 0;
    let structAtrBox = document.createElement('div');
    structAtrBox.classList.add('structAtrBox');
    let structAtrBoxTitle = document.createElement('h2');
    structAtrBoxTitle.innerText = "Member";
    structAtrBox.appendChild(structAtrBoxTitle);
    // Data Type
    let memberDType = document.createElement('input');
    memberDType.placeholder = 'Set member data type';
    structAtrBox.appendChild(memberDType);
    let memberDTypeSubmit = document.createElement('button');
    memberDTypeSubmit.innerText = 'Set datatype';
    structAtrBox.appendChild(memberDTypeSubmit);
    // Name
    let memberName = document.createElement('input');
    memberName.placeholder = 'Set member name';
    structAtrBox.appendChild(memberName);
    let memberNameSubmit = document.createElement('button');
    memberNameSubmit.innerText = 'Set name';
    structAtrBox.appendChild(memberNameSubmit);

    document.getElementById("box-container").appendChild(structAtrBox);

    structAtrBox.style.left = structBox.offsetLeft + structBox.offsetWidth + 10 + 'px';
    structAtrBox.style.top = structBox.offsetTop + 'px';

    structAtrBox.addEventListener("mousedown", startDrag);
    structAtrBox.addEventListener("mousemove", drag);
    structAtrBox.addEventListener("mouseup", endDrag);
    structAtrBox.addEventListener("mouseleave", endDrag);
  
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

    memberDTypeSubmit.addEventListener('click', () => {
      console.log(`Data type: ${memberDType.value}`);
    });

    memberNameSubmit.addEventListener('click', () => {
      if (nameCount === 0){
        console.log(`Member ${memberName.value}`);
        structAtrBoxTitle.innerText = `Member ${memberName.value}`;
        nameCount++;
      }

      if (amtStructMembers === 0){
        structNameCode[structNameForm.value] = `\nstruct {\n    ${memberDType.value} ${memberName.value};\n`;
        amtStructMembers++;
      } else {
        structNameCode[structNameForm.value] += ` 
    ${memberDType.value} ${memberName.value};\n`;
      }
      
    });
  });

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
});


// MODAL FOR CODE GENERATION
var modal = document.getElementById("myModal");

var btn = document.getElementById("myBtn");

var modalContent = document.querySelector('.modal-content');

var forPastCode = "";


btn.onclick = function() {
  modal.style.display = "block";
  modalContent.innerText = "";
  console.log(classNameCode);
  if (dropDown.value == "c++") {
    if (Object.keys(classNameCode).length === 0 && Object.keys(structNameCode).length === 0) {
      modalContent.innerText = "No Code Yet";
    }
    
    for (var i in structNameCode){
      var codeForAppending = `${structNameCode[i]} \n}, ${i};\n`;
      console.log(codeForAppending);
      modalContent.innerText += codeForAppending;
      forPastCode += codeForAppending;
    }
    
    for (var key in classNameCode) {
      var codeToAppend = `${classNameCode[key]} \n}`;
      console.log(codeToAppend);
      modalContent.innerText += codeToAppend;
      forPastCode += codeToAppend;
      console.log(codeToAppend);
    }
  } else {
    if (Object.keys(javaNameCode).length === 0) {
      modalContent.innerText = "No Code Yet";
    }
    for (var key in javaNameCode) {
      var code = `${javaNameCode[key]} \n}`;
      modalContent.innerText += code;
      forPastCode += code;
    }
  }


}
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}


saveCodeBtn.addEventListener('click', () => {
  if (Object.keys(classNameCode).length === 0 && Object.keys(structNameCode).length === 0){
    alert("Not saving code, no code to be saved!");
  } else {
    var pastCodeItems = JSON.parse(localStorage.getItem("pastCode"));
    pastCodeItems.push(forPastCode);
    localStorage.setItem("pastCode", JSON.stringify(pastCodeItems));
    console.log(pastCodeItems);
    alert("Code Saved!");
  }
});