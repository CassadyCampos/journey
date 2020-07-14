import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Component } from 'react';
import './App.css';
import Main from './Main';
import JourneyInfoModal from './components/JourneyInfoModal';

class App extends Component {
    constructor(props) {
        super(props);
    }


    render() {
        return (
            <div className="App">
                <nav
                    className="navbar navbar-light"
                    style={{ backgroundColor: '#7a5ad8' }}
                >
                    <div className="title">Journey</div>
                    <JourneyInfoModal />

                </nav>
                <Main />
            </div>
        );
    }
}

export default App;
