var txtInput;
var txtResult;
var currentOperation;
var subsequentCalc;

function initialize() {
    for (var i = 0; i < 10; i++) {
        document.getElementById('btn' + i).addEventListener("click", numberClick, false);
    }
    txtInput = document.getElementById('txtInput');
    txtResult = document.getElementById('txtResult');
    document.getElementById('btnPlus').addEventListener('click', function () { operation("addition") }, false);
    document.getElementById('btnMinus').addEventListener('click', function () { operation("subtraction") }, false);
    document.getElementById('btnDiv').addEventListener('click', function () { operation("division") }, false);
    document.getElementById('btnMulti').addEventListener('click', function () { operation("multiplication") }, false);
    document.getElementById('clearEntry').addEventListener('click', function () { Clear.clearEntry()}, false);
    document.getElementById('clear').addEventListener('click', function () { Clear.clearAll() }, false);
    document.getElementById('equal').addEventListener('click', equalClick, false);
    Clear.clearAll();
}

function equalClick() {
    var values = getValues();
    if (values[0] != "0" && values[1] != "0") {
        switch (currentOperation) {
            case "addition": {
                document.getElementById('txtResult').value = Number(values[0]) + Number(values[1]);
            }
                break;
            case "subtraction": {
                document.getElementById('txtResult').value = Number(values[0]) - Number(values[1]);
            }
                break;
            case "multiplication": {
                document.getElementById('txtResult').value = Number(values[0]) * Number(values[1]);
            }
                break;
            case "division": {
                document.getElementById('txtResult').value = Number(values[0]) / Number(values[1]);
            }
                break;
        }
    }
    currentOperation = subsequentCalc == "" ?
    currentOperation = "" : subsequentCalc;
    Clear.clearEntry();
}

function getValues() {
    var values = [document.getElementById('txtResult').value, document.getElementById('txtInput').value];
    return values;
}

function operation(type) {
        if (checkOperation(type)) {
            equalClick();
        }
        else {
            currentOperation = type;
            txtResult.value = txtResult.value == "0" ?
            txtResult.value = txtInput.value : txtResult.value;
            Clear.clearInput();
        }
    }

function checkOperation(operationType) {
        var values = getValues();
        if (currentOperation != "" && values[0] != "0" && values[1] != "0") {
            equalClick();
            subsequentCalc = operationType;
            return true;
        }
    }

function numberClick() {
        txtInput.value = txtInput.value == '0' ?
            this.innerText : txtInput.value + this.innerText;
        if (currentOperation == "") {
            if (txtResult.value.length > 0 && subsequentCalc == "")
                txtResult.value = "0";
        }
}

function Clear() { };
Clear.clearAll = function () {
    txtInput.value = "0";
    txtResult.value = "0";
    currentOperation = "";
};
Clear.clearEntry = function () {
    txtInput.value = txtInput.value.slice(0, -1);
    if (txtInput.value.length == 0) {
        txtInput.value = "0";
    }
};
Clear.clearInput = function () {
    txtInput.value = "0";
};