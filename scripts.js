// scripts.js

let functions = [];

function createFunction() {
    let functionName = document.getElementById('functionName').value;
    let functionType = document.getElementById('functionType').value;
    if (functionName && functionType) {
        functions.push({ name: functionName, type: functionType });
        renderFunctionList();
        document.getElementById('functionName').value = '';
        document.getElementById('functionType').value = '';
    }
}

function deleteFunction(index) {
    functions.splice(index, 1);
    renderFunctionList();
}

function moveUp(index) {
    if (index > 0) {
        let temp = functions[index];
        functions[index] = functions[index - 1];
        functions[index - 1] = temp;
        renderFunctionList();
    }
}

function moveDown(index) {
    if (index < functions.length - 1) {
        let temp = functions[index];
        functions[index] = functions[index + 1];
        functions[index + 1] = temp;
        renderFunctionList();
    }
}

function runFunction() {
    functions.forEach(func => {
        if (window[func.type]) {
            window[func.type]();
        } else {
            console.error(`Function '${func.type}' not found`);
        }
    });
}

function renderFunctionList() {
    let functionList = document.getElementById('functionList');
    functionList.innerHTML = '';
    functions.forEach((func, index) => {
        let functionItem = document.createElement('div');
        functionItem.className = 'function';
        functionItem.innerHTML = `
            <span>${func.name} - ${func.type}</span>
            <span onclick="moveUp(${index})">&#9650;</span>
            <span onclick="moveDown(${index})">&#9660;</span>
            <span onclick="deleteFunction(${index})">&#10060;</span>
        `;
        functionList.appendChild(functionItem);
    });
}
