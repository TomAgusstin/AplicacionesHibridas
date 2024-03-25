function suma(num, num2){
    return num + num2;
}

function restoDivision(num, num2){
    return num % num2;
}

function maxNumero(numeros){
    return Math.max(...numeros); // Nos devuelve el max de un array, hay que ponerle los ... al principio para que tome como array.
}

module.exports = {suma, restoDivision, maxNumero};