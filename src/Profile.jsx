import React, { Component } from 'react';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem, Button, Modal, FormControl, ButtonGroup, DropdownButton, Col } from 'react-bootstrap';
import aja from 'aja';
import Toolbar from './Toolbar.jsx';


class Profile extends Component {
    constructor(){
        super()
        this.state = {
            allImages: [],
            numberOfImages: 0,
        }
    }
    
    componentDidMount(){
        // Grab all the images via REST
        
        var image = this.state.image;
        var _this = this;
        aja()
            .method('get')
            .url("http://localhost:8080/images")
            .body({image: image})
            .on('success', function(data){
                console.log(data)
                var numberOfImages = 0
                for (var i=0; i<data.length; i++){
                    if (data[i].userID == localStorage.getItem("userID")){
                        numberOfImages = numberOfImages + 1;
                    }
                }
                
                _this.setState({allImages: data, numberOfImages: numberOfImages})
                
            })
            .go()
    }
    
    render() {
        return (
            <div>
                <Toolbar />
                <br/>
                <br/>
                <jumbotron>
                    <center>
                        <h1>hello!</h1>
                        <p>Number of pictures posted: {this.state.numberOfImages}</p>
                    </center>
                </jumbotron>
            
            </div>
        )
    }
}

export default Profile;