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

const readline = require("readline").createInterface({
    input: process.stdin,
    output: process.stdout,
}); // *-----------------------------------------=> LLAMADO AL MÓDULO DE CONSOLA

console.clear();
console.log("\x1b[36m%s\x1b[0m", "\nCONVERSOR DE ROMANO A ARÁBIGO (DECIMAL)\n");

readline.question("\tNúmero romano:  ", (caracteres: string): void => {
    let arabigo = romanoEnArabigo(caracteres); // *--------=> CONVERSIÓN DIRECTA
    let comprobacion = arabigoEnRomano(arabigo); // *------=> CONVERSIÓN INVERSA
    // *---------------------------------------------------------=> COMPROBACIÓN
    if (caracteres == comprobacion) {
        console.log("\tNúmero arábigo:", arabigo);
    } else {
        console.log("\tINGRESO INCORRECTO");
    }

    console.log("\x1b[36m%s\x1b[0m", "\nFIN DEL PROGRAMA\n");
    readline.close();
});

/**
 * La estrategia está basada en haber definido el siguiente patrón:
 *      => Para los múltiplos de 1, se tienen los carácteres I, V y X.
 *      => Para los múltiplos de 10, se tienen los carácteres X, L y C.
 *      => Para los múltiplos de 100, se tienen los carácteres C, D y M.
 * El número romano final es la concatenación de las cadenas individuales
 * basada en esas combinaciones.
 *
 * EL CASO 0:
 * En la numeración romana, el cero no existe. Lo bello de este algoritmo es que
 * cuando llega un cero, no lo ignora. Lo procesa:
 *
 *      Si (cero) <= 3 entonces retornar (bajos: C, X) repetido (cero) veces.
 *
 * @param {number} numero
 * @test console.log(arabigoEnRomano(3888));
 */

function arabigoEnRomano(numero: number): string {
    let retorno: string = "";

    function simbolo(
        cifra: number,
        bajos: string,
        medios: string,
        altos: string
    ): string {
        switch (true) {
            case cifra <= 3:
                return bajos.repeat(cifra); // *--------------------------=> 1-3
            case cifra === 4:
                return bajos + medios; // *---------------------------------=> 4
            case cifra <= 8:
                return medios + bajos.repeat(cifra - 5); // *-------------=> 5-8
            default:
                return bajos + altos; // *----------------------------------=> 9
        }
    }

    retorno += "M".repeat(Math.floor(numero / 1000)); // *--------------=> MILES
    numero %= 1000;

    retorno += simbolo(Math.floor(numero / 100), "C", "D", "M"); // *=> CENTENAS
    numero %= 100;

    retorno += simbolo(Math.floor(numero / 10), "X", "L", "C"); // *--=> DECENAS
    numero %= 10;

    retorno += simbolo(numero, "I", "V", "X"); // *------------------=> UNIDADES

    return retorno;
}

/**
 * La conversión es directa, comparando el caracter actual con el anterior
 * evaluado. La inversión de la cadena obedece a que los errores de conversión
 * son significativamente menores si se evalúa desde las unidades a los miles.
 *
 * @param {string} caracteres
 * @test console.log(romanoEnArabigo("MCMM"));
 */

function romanoEnArabigo(caracteres: string): number {
    const equivalencias = new Map<string, number>([
        ["I", 1],
        ["V", 5],
        ["X", 10],
        ["L", 50],
        ["C", 100],
        ["D", 500],
        ["M", 1000],
    ]);

    let retorno: number = 0,
        actual: number = 0,
        previo: number = 0;

    for (const caracter of caracteres.split("").reverse()) {
        actual = Number(equivalencias.get(caracter));
        if (actual >= previo) {
            retorno += actual;
        } else {
            retorno -= actual;
        }
        previo = actual;
    }
    return retorno;
}
