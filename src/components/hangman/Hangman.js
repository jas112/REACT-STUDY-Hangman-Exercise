import React, { Component } from 'react';
import AlphaButton from '../alphaButton/AlphaButton';
import './Hangman.css';
import img0 from '../../assets/0.jpg';
import img1 from '../../assets/1.jpg';
import img2 from '../../assets/2.jpg';
import img3 from '../../assets/3.jpg';
import img4 from '../../assets/4.jpg';
import img5 from '../../assets/5.jpg';
import img6 from '../../assets/6.jpg';

class Hangman extends Component {
    /** by default, allow 6 guesses and use provided gallows images. */
  static defaultProps = {
    maxWrong: 6,
    images: [img0, img1, img2, img3, img4, img5, img6]
  };

  constructor(props) {
    super(props);
    this.state = { 
        isWinner: false,
        isLoser: false,
        gameOver: false,
        nWrong: 0, 
        nRight: 0,
        guessed: new Set(), 
        answer: "apple" 
    };
    this.handleGuess = this.handleGuess.bind(this);
    this.resetGame = this.resetGame.bind(this);
  }

  /** guessedWord: show current-state of word:
    if guessed letters are {a,p,e}, show "app_e" for "apple"
  */
  guessedWord() {
    return this.state.answer
      .split("")
      .map(ltr => (this.state.guessed.has(ltr) ? ltr : "_"));
  }

  /** handleGuest: handle a guessed letter:
    - add to guessed letters
    - if not in answer, increase number-wrong guesses
  */
  handleGuess(ltr) {
    // let ltr = evt.target.value;
    this.setState(st => {
    //   guessed: st.guessed.add(ltr),
    //   nWrong: st.nWrong + (st.answer.includes(ltr) ? 0 : 1),
    //   nRight: this.guessedWord().filter(char => char != '_').length,
    //   isLoser: st.nWrong >= st.answer.length,
    //   isWinner: st.nRight == st.answer.length,
    //   gameOver: ((st.nRight == st.answer.length) || (st.nWrong >= st.answer.length))

      let newState = {...st};
      newState.guessed = st.guessed.add(ltr);
      newState.nWrong = st.nWrong + (st.answer.includes(ltr) ? 0 : 1);
      console.log(`nWrong => ${newState.nWrong}`);
      newState.nRight = this.guessedWord().filter(char => char != '_').length;
      console.log(`nRight => ${newState.nRight}`);
      newState.isLoser = (newState.nWrong >= st.answer.length);
      console.log(`isLoser => ${newState.isLoser}`);
      newState.isWinner = (newState.nRight == st.answer.length);
      console.log(`isWinner => ${newState.isWinner}`);

      if (newState.isLoser || newState.isWinner) {
        newState.gameOver = true;
      } else {
        newState.gameOver = false;
      }

      console.log(`gameOver => ${newState.gameOver}`);

      return newState;

    });
  }

  /** generateButtons: return array of letter buttons to render */
  generateButtons() {
    return "abcdefghijklmnopqrstuvwxyz".split("").map(ltr => (
    //   <button
    //     key={ltr}
    //     value={ltr}
    //     onClick={this.handleGuess}
    //     disabled={this.state.guessed.has(ltr) || this.state.gameOver}
    //   >
    //     {ltr}
    //   </button>

        <AlphaButton key={ltr} value={ltr} functionMethod={this.handleGuess} isDisabled={this.state.guessed.has(ltr) || this.state.gameOver} />

    ));
  }

  resetGame(){
    this.setState(currState => {
        let newState = {...currState};
        newState.isWinner = false;
        newState.isLoser = false;
        newState.gameOver = false;
        newState.nWrong = 0; 
        newState.nRight = 0;
        newState.guessed = new Set(); 
        newState.answer = "apple"; 

        return newState;
    });
  }

  render() {
    return (
        <div className='Hangman-container'>
            <h1>Hangman Exercise</h1>
            <div className='Hangman'>
                <h1>Hangman</h1>
                <img src={this.props.images[this.state.nWrong]} />
                <p className='Hangman-word'>{this.guessedWord()}</p>
                <p>nWrong: {this.state.nWrong} nRight: {this.state.nRight}</p>
                {this.state.isLoser ? <p>Loser!!!</p> : ''}
                {this.state.isWinner ? <p>Winner!!!</p> : ''}
                {/* <p>isLoser: {this.state.isLoser} isWinner: {this.state.isWinner}</p> */}
                <p className='Hangman-btns'>{this.generateButtons()}</p>
            </div>
            <button onClick={this.resetGame}>Reset Game</button>
        </div>
    )
  }
}

export default Hangman;