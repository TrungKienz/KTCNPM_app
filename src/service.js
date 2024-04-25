// Tính toán giá trị TAW
const calTAW = (data) => {
    var result = 0;
    for(var i = 0; i < data.length; i++){
        result += (parseInt(data[i].quantityTAW) * data[i].weightTAW);
    }
    return result;
}

//Tính toán giá trị BMT
const coefficientBMT = [1, 1.2, 1.5];
const weightBMT = [5, 10, 15]

const calTBF = (data) => {
    var result = 0;
    for (var i = 0; i < data.length; i++){
        result += ((parseInt(data[i].simpleTBF)*weightBMT[0] + parseInt(data[i].mediumTBF)*weightBMT[1] + parseInt(data[i].complicatedTBF)*weightBMT[2])*coefficientBMT[i]);
    }

    return result;
}

const calTFW = (data) => {
    var result = 0;
    for (var i = 0; i < data.length; i++){
        result += (parseFloat(data[i].weightTCF)*parseFloat(data[i].ratingValueTCF));
    }
    return result;  
}

const calEFW = (data) => {
    var result = 0;
    for( var i = 0; i < data.length; i++) {
        result += (parseFloat(data[i].weightEF) * parseFloat(data[i].ratingValueEF));
    }
    return result;
}

const calES = (data) => {
    var result = 0;
    for (var i = 0; i < data.length; i++) {
        result += parseFloat(data[i].ratingExEF);
    }
    return result;
}

const calP = (data) => {
    var ESpoint = calES(data);
    if (ESpoint < 1) {
        return 48;
    } else if ( ESpoint < 3 && ESpoint >= 1) {
        return 32;
    } else {
        return 20;
    }
}

const calAverageSalaryPerMonth = (data) => {
    var sumEmployee = 0;
    var sumSalary = 0;

    for(var i = 0; i < data.length; i++) {
        sumEmployee += parseInt(data[i].numberEmployeeH);
        sumSalary += (parseInt(data[i].wageH)*parseInt(data[i].numberEmployeeH));
    }

    console.log(sumSalary/sumEmployee)

    return sumSalary/sumEmployee;
}

const calSumSalary = (data) => {
    var sumSalary = 0;

    for(var i = 0; i < data.length; i++) {
        sumSalary += (parseInt(data[i].wageH)*parseInt(data[i].numberEmployeeH));
    }

    return sumSalary;
}


const displayVNDType = (number) => {
    const numberString = String(number);
    const numberArray = numberString.split('');

    let result = '';
    let count = 0;

    for (let i = numberArray.length - 1; i >= 0; i--) {
        result = numberArray[i] + result;

        count++;

        if (count === 3 && i !== 0) {
            result = ',' + result;
            count = 0;
        }
    }

    return result;
}


const randomKey = () => {
    return Math.round(Math.random()*1000000)
}

export const calculatorService = {
    calTAW,
    calTBF,
    calTFW,
    calEFW,
    calES,
    calP,
    calAverageSalaryPerMonth,
    calSumSalary,
    displayVNDType,
    randomKey
}

export default calculatorService;