//JS Calculator
//by 강성연
//2020.08.10 


//input 객체
//입력을 담당
var input = { 'array' : [] };


//입력받은 수식을 문자열로 리턴
input.getInput = function(){

    return this.array.join("");
};

//입력 배열을 초기화
input.removeAll = function(str){
    this.array = [];
    this.array.push(str);
};

//수식이 비었는지 검사
input.empty = function(){
    return this.array.length === 0;
};



input.getValue = function(){
    var str = this.array.shift();
    var n = Number(str);
    return n;
};

input.prepareCalculate = function(){
    this.array = this.array.join("").split(" ");
}


input.getOperator = function(){
    var op = this.array.shift();
    if (op === "+" || op === "-" || op === "*" || op === "/" || op === "q") {
        return op;
    } else {
        return "$";
    }
};


//output 객체
//출력을 담당한다.
var output = {};

output.display = function(){
    this.text.innerHTML = input.getInput();
};

output.text = document.getElementById('output');

output.print = function(str){
    this.text.innerHTML = str;
}

//calculator 객체
var calculator = {};
calculator.calculate = function (result, n2, op) {
    
    if (op === "+") {
        result += n2;

    } else if (op === "-") {
        result -= n2;

    } else if (op === "*") {
        result *= n2;

    } else if (op === "/") {
        result /= n2;

    }

    return result;
};

var clickNumbers = function(evenet){

    var str = event.target.innerHTML;
    console.log(str);

    switch(str){
        case 'BS':
            input.array.pop();
            break;
        case '+':
        case '-':
        case '*':
        case '/':
            input.array.push(' ' + str + ' ');
            break;
        default:
            input.array.push(str);

    }
    if(input.empty()){
        output.text.innerHTML = "Empty";
    }else{
        output.display();
    }
    //console.log(input.getInput());
}

var showResult = function(event){

    input.prepareCalculate();
    var result = input.getValue();
    while (!input.empty()) {
        var op = input.getOperator();
        var second = input.getValue();
        result = calculator.calculate(result, second, op);
    }
    output.print(result);
    input.removeAll(result);
}
