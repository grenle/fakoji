import React from 'react'

import emobotpool from '../data/emobots'
import pickbang   from '../utils/pickBang'
import randinc from '../utils/randinc'

import './Lobby.css'

import getword from '../utils/getword'

class Lobby extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      MAXPLAYERS: this.props.MAXPLAYERS || 3,
      players: this.props.players,
    }
  }
  render(){
    const { players } = this.props
    return(
      <div>
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
  registerPlayers(){
    const { MAXPLAYERS, emobots } = this.state
    const numplayers = this.props.players.length
    // emobots.push(pickbang(emobotpool))
    if(numplayers < MAXPLAYERS ){
      this.props.addplayer( pickbang(emobotpool ))
      // this.setState({ emobots })
      setTimeout(this.registerPlayers.bind(this), randinc(500, 2000))
    }else{
      getword().then( wordo => {
        this.props.setword(wordo.word.split(''))
        this.props.waitoff()
      })
    }
  }
  componentDidMount(){
    setTimeout(this.registerPlayers.bind(this), randinc(500, 2000))
  }
}

export default Lobby