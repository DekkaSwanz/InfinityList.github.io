import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';
import AppNavbar from './components/AppNavbar';
import Todolist from './components/Todolist';

class App extends Component {
  render() {
    return (
      <div id='app' className="App">
      <AppNavbar/>
      <Todolist/>
      </div>
    );
  }
}

export default App;
