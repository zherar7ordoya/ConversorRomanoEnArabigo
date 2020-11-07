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

module.exports = function arabigoEnRomano(numero: number): string {
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
