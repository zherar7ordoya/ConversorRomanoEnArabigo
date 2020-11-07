/**
 * @title CONVERSOR DE ROMANO A ARÁBIGO (DECIMAL)
 * @version 1.0.0
 * @description Solución completa (con comprobación inversa) a la conversión de
 * un número romano a uno arábigo (decimal).
 * @license MIT
 * @repository https://github.com/zherar7ordoya/ConversorRomanoEnArabigo.git
 *
 * @author Gerardo Tordoya
 * @homepage https://zherar7ordoya.github.io/
 * @date 2020-11-07
 *
 * @comments La presente solución se basa en un conversor directo desde un
 * número romano a arábigo. Y luego se hace la comprobación enviando este
 * número arábigo (decimal) para ser reconvertido a romano. Luego se compara
 * este resultado con la cadena enviada originalmente. De coincidir, se muestra
 * el resultado de la conversión. Caso contrario, se emite un mensaje de error.
 *
 * @references https://stackoverflow.com/questions/49091379/how-to-debug-an-interactive-node-js-app-in-vs-code
 *
 * @bugs
 */
const arabigoEnRomano = require("./arabigoEnRomano");
const romanoEnArabigo = require("./romanoEnArabigo");
const readline = require("readline").createInterface({
    input: process.stdin,
    output: process.stdout,
}); // *-----------------------------------------=> LLAMADO AL MÓDULO DE CONSOLA
console.clear();
console.log("\x1b[36m%s\x1b[0m", "\nCONVERSOR DE ROMANO A ARÁBIGO (DECIMAL)\n");
readline.question("\tNúmero romano:  ", (caracteres) => {
    let arabigo = romanoEnArabigo(caracteres); // *--------=> CONVERSIÓN DIRECTA
    let comprobacion = arabigoEnRomano(arabigo); // *------=> CONVERSIÓN INVERSA
    // *---------------------------------------------------------=> COMPROBACIÓN
    if (caracteres == comprobacion) {
        console.log("\tNúmero arábigo:", arabigo);
    }
    else {
        console.log("\tINGRESO INCORRECTO");
    }
    console.log("\x1b[36m%s\x1b[0m", "\nFIN DEL PROGRAMA\n");
    readline.close();
});
