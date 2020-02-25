//https://www.sttmedia.com/characterfrequency-french

import React from 'react'
// import logo  from './logo.svg'

// import getword from './utils/getword'

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'

import Button from 'react-bootstrap/Button'

import Game from './components/Game'

class App extends React.Component{
  render(){
    return(
      <div className="container-fluid">
        <Game/>
        <Button onClick={ () => console.log('prout prout prout que je t\'aime') }>PROUT</Button>
      </div>
    )
  }
}

export default App;
