const operaciones = require('./Calculos.js');

console.log("Hola mundo");

console.log(`La suma da: ${operaciones.suma(5, 10)}`);

console.log(`El resto da: ${operaciones.restoDivision(20, 2)}`);

console.log(`El resto de cero: ${operaciones.restoDivision(20, 0)}`);

console.log(`El maximo nro. es: ${operaciones.maxNumero([2,8,9,7,5,6])}`);