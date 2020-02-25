import React from 'react'

import './Game.css'

import getword from '../utils/getword'

// import emobotProfiles from '../data/emobots'

class Game extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      keyboard: [...new Array(26)].map( (_, i) =>
      ({ char: String.fromCodePoint(i + 97), active: true })),
      guessed: [],
      keyel: null
    }
  }
  render(){
    const { keyboard, guessed } = this.state
    return(
      <div>
        <p className="spanwrap text-center">
          { guessed.map( (letter, i) =>
            <span key={i}>{letter}</span>
          )}
        </p>
        <p className="spanwrap">
          { keyboard.map( (o, i) =>
          <span key={i} className={o.active ? "keyactive" : "keydead"}>
            {o.char}
          </span> )
          }
        </p>
      </div>
    )
  }
  async componentDidMount(){
    const wordO = await getword()
    const guessed = wordO.word.split('')
    const keyel = document.addEventListener(
      'keypress', e => console.log(e))
    this.setState({ guessed, keyel })
  }
  componentWillUnmount(){
    console.log('Game is dying dying dead')
  }
  ignoreKeyboard(){
    // if this.state.keyel,
    // javascript simply returns undefined
    document.removeEventListener('keypress', this.state.keyel)
  }
}

export default Game