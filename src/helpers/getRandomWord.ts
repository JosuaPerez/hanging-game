let words: string[] = [
    'COMPUTADORA',
    'AGUA',
    'QUESO',
    'AGUACATE',
    'DINOSAURIO',
    'FREESTYLE',
    'HUMOR',
    'VEHICULO',
    'CELULAR',
    'CASA',

];




export function getRandomWord() {

    const randomIndex = Math.floor( Math.random() * words.length );
    return words[randomIndex]

}