import React, { Component } from 'react';
import Toolbar from './Toolbar.jsx';
import ImageBoard from './ImageBoard.jsx';
import aja from 'aja';






class App extends Component {
    
    constructor(props){
        super(props);
    }
    
    render() {
        return (
            <div>
                <Toolbar history = {this.props.history} /> // parse the history into toolbar 
                <ImageBoard />
            </div>
        );
    }
}

export default App;
