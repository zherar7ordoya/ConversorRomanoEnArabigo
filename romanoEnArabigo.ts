/**
 * La conversión es directa, comparando el caracter actual con el anterior
 * evaluado. La inversión de la cadena obedece a que los errores de conversión
 * son significativamente menores si se evalúa desde las unidades a los miles.
 *
 * @param {string} caracteres
 * @test console.log(romanoEnArabigo("MCMM"));
 */

module.exports = function romanoEnArabigo(caracteres: string): number {
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
