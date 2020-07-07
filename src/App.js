import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import logo from './logo.svg';
import './App.css';
import Main from './Main'

function App() {
  return (
    <div className="App">
      <nav className="navbar navbar-light" style={{backgroundColor: '#7a5ad8'}}>
        <div className="title">Journey</div>
      </nav>
      <Main />
    </div>
  );
}

export default App;
