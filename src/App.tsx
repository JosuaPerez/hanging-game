import { useEffect, useState } from 'react';
import { HangImage } from './components/HangImage';
import { letters } from './helpers/letters'; 
import { getRandomWord } from './helpers/getRandomWord'

import './App.css'
function App() {

  const [ word, setWord ] = useState(getRandomWord);
  const [ hiddenWord, setHiddenWord ] = useState('_ '.repeat( word.length ))
  const [ attempts, setAttempts ] = useState(0)
  const [ lose, setLose ] = useState( false );
  const [ won, setWon ] = useState( false );

  useEffect( () => {

    if ( attempts >= 9 ) {
      setLose(true);
    }

  }, [ attempts ])


  useEffect(() => {
    const currentHiddenWord = hiddenWord.split(' ').join('')

    if( currentHiddenWord === word ) {
      setWon( true )
    }

  }, [ hiddenWord ])


  const checkLetter = ( letter: string ) => {
    
    if( lose ) return; 
    if( won ) return;

    if ( !word.includes(letter) ) {
      setAttempts( Math.min ( attempts + 1, 9 ) )
      return;
    } 

    const hiddenWordArray = hiddenWord.split(' ');

    for( let i = 0; i < word.length; i++ ) {
      if ( word[i] === letter ) {
        hiddenWordArray[i] = letter;
      }
    }

    setHiddenWord(hiddenWordArray.join(' '));

  }

  const newGame = () => {
    const newWord = getRandomWord();

    setWord( newWord );
    setAttempts(0);
    setHiddenWord( '_ '.repeat( newWord.length ) );
    setLose( false );
    setWon( false );
   
  }

  return (
    <div className="App">
      
      {/* Imagenes */}
      <HangImage imageNumber={ attempts } />

      {/* Palabra Oculta */}
      <h3> { hiddenWord } </h3>

      {/* Contador de intentos */}
      <h3>Intentos: { attempts } </h3>

      {/* Mensaje si perdio */}

      {
        ( lose ) 
        ? <h2>Usted no sirve, La palabra es: { word } </h2>
        : ''
      }

      {/* Mensaje si gano */}

      {
        ( won ) 
        ? <h2>Usted es muy duro</h2>
        : ''
      }

      {/* Botones de letras */}
      {
        letters.map( (letter) => (
          <button 
          onClick={ () => checkLetter(letter) }
          key={ letter }>
            { letter }
          </button>
        ))
      }
      <br />
      <button onClick={ newGame } >¿Nuevo juego?</button>
          

    </div>
  )
}

export default App
