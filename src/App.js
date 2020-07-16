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
                <footer id="sticky-footer" class="py-4 bg-dark text-white-50">
            <div class="container text-center">
            <small>Copyright &copy; Journey Inc.</small>
            </div>
            </footer>
            </div>
        );
    }
}

export default App;
