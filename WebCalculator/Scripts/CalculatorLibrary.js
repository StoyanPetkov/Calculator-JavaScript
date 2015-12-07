/// <reference path="_references.js" />
(function () {
    this.calculatorNamespace = this.calculatorNamespace || {};
    var ns = this.calculatorNamespace;

    ns.initialize = function () {
        var calculator = new ns.Calculator();
        $(':button[id^="btn"]').filter(function (index) {
            var rg = /\d/g;
            if (rg.test(this.id)) {
                return this;
            }
        }).on('click', calculator.numberClick);
        $('#btnPlus').on('click', function () { calculator.operation("addition"); });
        $('#btnMinus').on('click', function () { calculator.operation("subtraction"); });
        $('#btnDiv').on('click', function () { calculator.operation("division"); });
        $('#btnMulti').on('click', function () { calculator.operation("multiplication"); });
        $('#clearEntry').on('click', calculator.clearEntry);
        $('#clear').on('click', calculator.clearAll);
        $('#equal').on('click', calculator.equalClick);
        calculator.clearAll();
    };

    ns.Calculator = (function () {
        function Calculator() {
        };
        Calculator.currentOperation;
        Calculator.subsequentOperation;
        Calculator.prototype.checkOperation = function (operationType) {
            var values = Calculator.prototype.getValues();
            if (Calculator.currentOperation != "" && values[0] != "0" && values[1] != "0") {
                Calculator.prototype.equalClick();
                Calculator.subsequentCalc = operationType;
                return true;
            }
        };
        Calculator.prototype.getValues = function () {
            var values = [$('#txtResult').val(), $('#txtInput').val()];
            return values;
        };
        Calculator.prototype.numberClick = function () {
            $('#txtInput').val($('#txtInput').val() == '0' ?
            $(this).text() : $('#txtInput').val() + $(this).text());
            if (this.checkOperation == "") {
                if ($('#txtResult').length > 0 && Calculator.subsequentCalc == "") {
                    $('#txtInput').val("0");
                }
            }
        };
        Calculator.prototype.operation = function (operationType) {
            if (Calculator.prototype.checkOperation(operationType)) {
                Calculator.prototype.equalClick();
            }
            else {
                Calculator.currentOperation = operationType;
                $('#txtResult').val($('#txtResult').val() == "0" ?
                    $('#txtInput').val() : $('#txtResult').val());
                Calculator.prototype.clearInput();
            }
        };
        Calculator.prototype.equalClick = function () {
            var values = Calculator.prototype.getValues();
            if (values[0] != "0" && values[1] != "0") {
                switch (Calculator.currentOperation) {
                    case "addition": {
                        $('#txtResult').val(Number(values[0]) + Number(values[1]));
                    }
                        break;
                    case "subtraction": {
                        $('#txtResult').val(Number(values[0]) - Number(values[1]));
                    }
                        break;
                    case "multiplication": {
                        $('#txtResult').val(Number(values[0]) * Number(values[1]));
                    }
                        break;
                    case "division": {
                        $('#txtResult').val(Number(values[0]) / Number(values[1]));
                    }
                        break;
                }
            }
            Calculator.currentOperation = Calculator.subsequentCalc == "" ?
            Calculator.currentOperation = "" : Calculator.subsequentCalc;
            Calculator.prototype.clearInput();
        };
        Calculator.prototype.clearAll = function () {
            $('#txtInput').val(0);
            $('#txtResult').val(0);
            this.currentOperation = "";
        };
        Calculator.prototype.clearEntry = function () {
            var value = $('#txtInput').val();
            $('#txtInput').val(value.slice(0, -1));
            if ($('#txtInput').val().length == 0) {
                $('#txtInput').val('0');
            }
        };
        Calculator.prototype.clearInput = function () {
            $('#txtInput').val('0');
        };
        return Calculator;
    }());
})();