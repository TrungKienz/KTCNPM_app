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

export const calculatorService = {
    calTAW,
    calTBF,
    calTFW
}

export default calculatorService;