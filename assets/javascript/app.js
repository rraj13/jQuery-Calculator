var expressionArr = [];
var calculationArr = [];
var operators = ["+", "-", "*", "/"];
var numChange;

$(".number").on("click", function() {
    expressionArr.push($(this).val());
    $("#numbers-field").append($(this).val());
});

$(".operation").on("click", function() {
    expressionArr.push($(this).val());
    $("#numbers-field").append("" + $(this).val() + "");
});

$(".clear").on("click", function() {
    expressionArr = [];
    $("#numbers-field").text("");
});

$(".enter").on("click", function() {

    //converts user input to parsable string

    do {
        numChange = false;
        for (var i = 0; i < expressionArr.length-1; i++) {
            if (typeof parseInt(expressionArr[i]) === "number" && operators.indexOf(expressionArr[i]) === -1 &&
                typeof parseInt(expressionArr[i+1]) === "number" && operators.indexOf(expressionArr[i+1]) === -1) {
                var start_index = i;
                var num_elements_to_remove = 2;
                var combined = expressionArr[i] + expressionArr[i+1];
                expressionArr.splice(start_index, num_elements_to_remove, combined);
                numChange = true;
            } 
        }
    }

    while(numChange);

    //parsing all elements into numbers except operators and returning a new array

    for (var i = 0; i < expressionArr.length; i++) {
        if (expressionArr[i] === "+" || expressionArr[i] === "-" || expressionArr[i] === "*" || expressionArr[i] === "/") {
            calculationArr.push(expressionArr[i]);
        } else {
            var parsed = parseInt(expressionArr[i]);
            calculationArr.push(parsed);
        }
    }

    while (calculationArr.includes("*") || calculationArr.includes("/")) {
        for (var i = 0; i < calculationArr.length; i++) {
            if (calculationArr[i] === "*") {
                var result = calculationArr[i-1] * calculationArr[i+1];
                var start_index = i-1;
                var num_elements_to_remove = 3;
                calculationArr.splice(start_index, num_elements_to_remove, result);
            } else if (calculationArr[i] === "/") {
                var result = calculationArr[i-1]/calculationArr[i+1];
                var start_index = i-1;
                var num_elements_to_remove = 3;
                calculationArr.splice(start_index, num_elements_to_remove, result);
            }
        }
    }

    while (calculationArr.includes("-") || calculationArr.includes("+")) {
        for (var i = 0; i < calculationArr.length; i++) {
            if (calculationArr[i] === "-") {
                var result = calculationArr[i-1] - calculationArr[i+1];
                var start_index = i-1;
                var num_elements_to_remove = 3;
                calculationArr.splice(start_index, num_elements_to_remove, result);
            } else if (calculationArr[i] === "+") {
                var result = calculationArr[i-1] + calculationArr[i+1];
                var start_index = i-1;
                var num_elements_to_remove = 3;
                calculationArr.splice(start_index, num_elements_to_remove, result);
            }
        }
    }

    console.log(calculationArr);

    

    $("#numbers-field").append(" = " + calculationArr[0]);

});


