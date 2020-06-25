import React from 'react'

import './Game.css'

import getword from '../utils/getword'

const hangojis = [
  '1F601', '1F601', '1F642',
  '1F642', '1F610', '1F928',
  '1F915', '26B0'
]

class Game extends React.Component{
  constructor(props){
    super(props)
    const { word } = this.props
    console.log(`constructing ${word}`)
    this.state = {
      keyboard: [...new Array(26)].map( (_, i) =>
      ({ char: String.fromCodePoint(i + 97), active: true })),
      guessed: word.map( _ => '_' ),
      tried  : new Set(),
      keyel: null,
      fails: 0,
      word
    }
    this.evalkeye = this.evalkeye.bind(this)
  }
  render(){
    const { keyboard, guessed } = this.state
    const fails = this.state.fails > 7 ? 7 : this.state.fails
    const { players } = this.props
    return(
      <div className="text-center">
        <div className="">
          <img className="col-3" src={`/openmoji/${hangojis[fails]}.svg`}/>
        </div>
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
        <div className="players row justify-content-md-center">
        { players.map( (bot, i) =>
          <div key={i} className="player col-3">
            <img className="avatar" src={`/openmoji/${bot.avatar}.svg`} />
            <p>{bot.handle}</p>
          </div>
        )}
        </div>
      </div>
    )
  }
  evalkeye(keye, player){
    this.ignoreKeyboard()
    const { tried, word, guessed } = this.state
    let   { fails } = this.state
    console.log('-'.repeat(30))
    console.log('STATE')
    console.log(`key     : ${keye.key}`)
    console.log(`tried   : ${tried}`)
    console.log(`word    : ${word}`)
    console.log(`guessed : ${guessed}`)
    console.log(`fails   : ${fails}`)
    console.log('-'.repeat(30))
    const key = keye.key
    if(!tried.has(key)){
      tried.add(key)
      this.setState(tried)
      const charI = key.codePointAt(0)-97 
      const keyboard = this.state.keyboard
      keyboard[charI].active = false
      // if(word.indexOf(key) === -1){
      if(!word.includes(key.toUpperCase()) && !word.includes(key.toLowerCase())){
        fails++
        if(fails >= 7){
          this.setState({fails: 0})
          this.ignoreKeyboard()
          this.props.soundObjects.gameover.play()
          // setTimeout(this.props.waiton, 800)
          // this.setState({
          //   keyboard: [],
          //   guessed: [],
          //   tried: null,
          //   keyel: null,
          //   fails: 0,
          //   word: []
          // })
          this.props.waiton()
        }
      // }else if(!guessed.includes('_')){
      //   this.props.soundObjects.gamewin.play()
      }else{
        word.forEach( (c, i) => {
          if(key.toLowerCase() === c.toLowerCase()){ guessed[i] = c }
        })
        if(guessed.includes('_')){
          this.props.soundObjects.coin.play()
        }else{
          this.props.soundObjects.gamewin.play()
          this.props.waiton()
        }
      }
      this.setState({ keyboard, guessed, fails })
    }

  }
  async componentDidMount(){
    // const wordO   = await getword()
    // const word    = wordO.word.split('')
    // const guessed = word.map( _ => '_' )
    const keyel   = document.addEventListener(
      'keypress', this.evalkeye)
    const fails   = 0
    const tried = new Set()
    console.log(keyel, fails, tried)
    this.setState({ keyel, fails, tried  })
  }
  componentWillUnmount(){
    console.log('Game is dying dying dead')
    this.ignoreKeyboard()
  }
  ignoreKeyboard(){
    // if this.state.keyel is null,
    // javascript simply returns undefined
    document.removeEventListener('keypress', this.keyel, {capture: true})
  }
}

export default Game