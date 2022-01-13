
// +++++++++++++++++ //
// Sample Test Cases //
// +++++++++++++++++ //
// 1+2+3-4+5*6*7*8*7/7         
// 10+20-30+40*5/2+10/5         
// 10*20-30/40*5/2-10*5*0      
// 10*20-30/40/5+2-10*5*9       
//.02+123-456*789               
// 78%9/456*123-0.2             
// 10+20-30+40*5/2+10*5/5
// 87*2+115%111
// 1*6.8*6%100
// 10+20-30+40*5/2+10*5*5
// 10+20-30+40*5/2+10*5/5+6+9
// 10+20-30+40*10+10*5/2+10*5/5+6+9
// 10+20-30+40*10+10+10*5+10
// 10+20-30+40*10+10+10*5+9+9+10
// 10*20-30/2+40*5+2-10*5+9-87*2+115%111
// +++++++++++++++++ //
// +++++++++++++++++ //


validEq = true
isOpen = false
var finalResult = ""

// get input from keyboard
document.addEventListener('keypress', (event) => {
    if (event.keyCode == 61 || event.keyCode == 13) {
        startEvaluation(document.getElementById("equation").value)
    }
    else if (event.keyCode > 41 && event.keyCode < 58 || event.keyCode == 37) {
        append(event.key)
    }
    console.log(event.key + "--" + event.keyCode)
})
document.addEventListener('keydown', e => {
    // console.log(e.key + "---" + e.keyCode)
    if (event.keyCode == 8) {
        backspace(document.getElementById("equation").value)
        document.getElementById("result").value = ""
    }
})

// open scientific calculator layout
function OpenScientificLayout() {
    if (isOpen) {
        document.getElementById("calBody").style.width = "300px";
        document.getElementById("sciClacDiv").style.display = "none";
        document.getElementById("SciCalc").style.width = "25%";
        document.getElementById("result").style.width = "70%";
        document.getElementById("icon1").className = "fas fa-angle-double-left"
        document.getElementById("icon1").title = "Open scientific Calculator"
        isOpen = false
    }
    else {
        document.getElementById("calBody").style.width = "700px"
        document.getElementById("sciClacDiv").style.display = "block";
        document.getElementById("SciCalc").style.width = "10%";
        document.getElementById("result").style.width = "87.8%";
        document.getElementById("icon1").className = "fas fa-angle-double-right"
        document.getElementById("icon1").title = "Close scientific Calculator"
        isOpen = true
    }
}

function append(text) {
    document.getElementById("equation").value += text
}

function plusMinus(equation){
    result = startEvaluation(equation)
    document.getElementById('result').value = result * -1
}

function clearEquation() {
    document.getElementById("equation").value = ""
    document.getElementById("result").value = ""
}

function backspace(text) {
    document.getElementById("equation").value = text.substring(0, text.length - 1)
}


function startEvaluation(equation) {

    console.log(eval(equation))
    var operators = []
    var operands = []
    var operandString = ""
    for (var index = 0, operatorIndex = 0; index < equation.length; index++) {
        // Checking for operators
        if (equation.charAt(index) == '+'
            || equation.charAt(index) == '-'
            || equation.charAt(index) == '*'
            || equation.charAt(index) == '/' || equation.charAt(index) == '%') {
            operators[operatorIndex++] = equation.charAt(index)
            operandString += " "
        }
        else {
            operandString += equation.charAt(index)
        }
    }

    operands = operandString.split(" ")  

    validEq =  isValid(operands)

    if(validEq){
        finalResult = evaluate(operators, operands) 
        document.getElementById("result").value = finalResult
    }
    else{
        document.getElementById("result").value = "Expression error"
        return
    }

    return finalResult
}

function evaluate(operators, operands) {
    while (operators.length > 0) {
        var indexP = operators.indexOf("%", 0)
        if (indexP != -1) {
            if (operands[indexP + 1] == "") {
                operands[indexP + 1] = 1
            }
            operands[indexP] = ((operands[indexP] / 100) * operands[indexP + 1] ).toFixed(2)
            operands.splice(indexP + 1, 1)
            operators.splice(indexP, 1)
        }
        else {
            var indexD = operators.indexOf("/", 0)
            if (indexD != -1) {
                operands[indexD] = operands[indexD] / operands[indexD + 1]
                operands.splice(indexD + 1, 1)
                operators.splice(indexD, 1)
            }
            else {
                var indexM = operators.indexOf("*", 0)
                if (indexM != -1) {
                    operands[indexM] = operands[indexM] * operands[indexM + 1]
                    operands.splice(indexM + 1, 1)
                    operators.splice(indexM, 1)

                }
                else {
                    var indexM = operators.indexOf("-", 0)
                    if (indexM != -1) {
                        operands[indexM] = operands[indexM] - operands[indexM + 1]
                        operands.splice(indexM + 1, 1)
                        operators.splice(indexM, 1)
                    }
                    else {
                        var indexP = operators.indexOf("+", 0)
                        if (indexP != -1) {
                            operands[indexP] = parseFloat(operands[indexP]) + parseFloat(operands[indexP + 1])
                            operands.splice(indexP + 1, 1)
                            operators.splice(indexP, 1)
                        }
                    }
                }
            }
        }
    }
    console.log(operands)
    return operands[0]
}

function isValid(operands){
    for(var i = 0; i < operands.length ; i++){
        if( operands[i] == ''){
            return false
        }
    }
    return true
}


