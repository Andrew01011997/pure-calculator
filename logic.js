function calculate(first_value, second_value, operation){
    switch (operation) {
        case '+': return first_value+second_value;
        case '-': return first_value-second_value;
        case '/': return first_value/second_value;
        case '*': return first_value*second_value;
        case '%': return first_value%second_value;
    }
}

let first = 0,
    operation = '',
    numberString = '0',
    result = 0,
    output ='0'

const operationsWithData = {
    setOperation: op => () => {
        operation = op
        first = first || +numberString;
        numberString = '0'
        output = numberString
    },

    append: symbol => () => {
        numberString = numberString==='0'? symbol : numberString+symbol
        output = numberString
    },
    removeLast: () => {
        numberString = numberString.length===1?'0':numberString.slice(0, -1)
        output = numberString
    },
    removeAll: () => {
        numberString = '0'
        operation = ''
        first = 0
        output = '0'
    },

    switchNumber: () => numberString = numberString[0] === '-' ? numberString.slice(1, numberString.length-1) : '-'+numberString,

    getResult: ()  => {
        result = calculate(first, +numberString, operation)
        first = result
        output = result
    },

}

function withUpdateDisplay(base) {
    return () =>{
        base();
        display.innerHTML = output;
    }
}