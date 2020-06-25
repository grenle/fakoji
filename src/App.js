//https://www.sttmedia.com/characterfrequency-french

import React from 'react'
// import logo  from './logo.svg'

// import getword from './utils/getword'

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'

import Button from 'react-bootstrap/Button'

import Game  from './components/Game'
import Lobby from './components/Lobby'

const justine = { avatar: "1F469", handle: "juju" }

class App extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      wait: true,
      players: [],
      word : '',
      soundObjects: []
    }
    this.waitoff   = this.waitoff.bind(this)
    this.waiton    = this.waiton.bind(this)
    this.setword   = this.setword.bind(this)
    this.addplayer = this.addplayer.bind(this)
  }
  waitoff(){
    this.setState({ wait: false })
  }
  waiton(){
    this.setState({ wait: true })
  }
  setword(word){
    this.setState({ word })
  }
  addplayer(player){
    const { players } = this.state
    players.push(player)
    this.setState(players)
  }
  render(){
    const { wait, players } = this.state
    return(
      <div className="container-fluid">
        {wait ? <Lobby setword={this.setword} players={this.state.players} addplayer={this.addplayer} waitoff={this.waitoff} /> : 
                <Game word={this.state.word} soundObjects={this.state.soundObjects} players={this.state.players} waiton={this.waiton} /> }
      </div>
    )
  }
  componentDidMount(){
    const soundObjects = {
      coin     : new Audio('snd/coin.wav'),
      gameover : new Audio('snd/gameover.wav'),
      gamewin  : new Audio('snd/gamewin.wav')
    }
    this.setState({soundObjects})
  }
}

export default App;
