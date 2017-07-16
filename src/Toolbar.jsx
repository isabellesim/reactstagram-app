import React, { Component } from 'react';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem, Button, Modal, FormControl, ButtonGroup, DropdownButton } from 'react-bootstrap';
import aja from 'aja';
import Webcam from 'react-webcam';
import './image-filters.css';





const filters = [
    "none",
    "grayscale",
    "sepia",
    "saturate",
    "hue-rotate",
    "invert",
    "bright",
    "contrast",
    "blur"
]

class Toolbar extends Component{
    
    constructor(props){
        super(props);
        this.state = {
            modalShown: false,
            picModalShown: false,
            username: '',
            password: '',
            imageSrc: '',
            filter: filters[0]
        };
    }
    
    
    setRef = (webcam) => { // same as setRef(webcam){. setRef is like a react id
        this.webcam = webcam;
    }
 
    capture = () => { // same as capture(){; => means function
        const imageSrc = this.webcam.getScreenshot(); // means image source will not change anymore, this variable is imutable
        // use when you are very sure that you won't change it anymore --> for safety of the variable
        console.log(imageSrc)
        this.setState({imageSrc: imageSrc});
    };
    
    handleSubmitImage(){
        
        var userID = localStorage.getItem("userID");
        var text = "Super Awesome Picture"
        var image = this.state.imageSrc;
        
        aja()
            .method('post')
            .url('http://localhost:8080/image')
            .body({userID, text, image})
            .on('success', function(data){
                console.log(data)
                if (data.status == 200){
                    alert("Image was successfully uploaded")
                    console.log(text)
                } else {
                    alert("Image upload failed")
                }
            })
            .go();
    }
    
    
    handleClosePicModal(){
        // set state for modalShown
        this.setState({picModalShown: false});
    }
    
    handleOpenPicModal(){
        this.setState({picModalShown: true});
    }
    
    
    render(){
        var _this = this;
        return(
            <Navbar fixedTop>
                <Navbar.Header>
                    <Navbar.Brand>
                        <a href="#">Reactstagram!</a>
                    </Navbar.Brand>
                </Navbar.Header>
                    
                    <Nav pullRight>
                        <NavItem href = "#">
                            <ButtonGroup>
                                <Button onClick={this.handleOpenPicModal.bind(this)} bsStyle="info" bsSize = "xsmall">Take a picture</Button>
                                <Button onClick={() => this.props.history.push('/profile')} bsSize = "xsmall">Take me to thyself</Button>
                            </ButtonGroup>
                                
                        </NavItem>
                    </Nav>
                    
                    
    
                    
                    
                    <Modal show={this.state.picModalShown}> 
                        <Modal.Header>
                            <Modal.Title>Take a picture!</Modal.Title>
                        </Modal.Header>

                        <Modal.Body>
                            <center>
                                <Webcam
                                  audio={false}
                                  height={350}
                                  ref={this.setRef}
                                  screenshotFormat="image/jpeg"
                                  width={350}
                                  className={this.state.filter} // everytime the filter changes, it will update the webcam accordingly
                                />
                                
                                <img className={this.state.filter} src={this.state.imageSrc}/> 
                                
                                <DropdownButton title={"Filters"}>
                                    {filters.map(function(filter){
                                        return(
                                            <MenuItem onClick = {() => _this.setState({filter: filter})}>{filter}</MenuItem>
                                        )
                                    })}
                                </DropdownButton>
                                
                                
                                <FormControl
                                type="text"
                                placeholder="text"
                                />
                                
                            </center>

                        </Modal.Body>

                        <Modal.Footer>
                            <Button onClick={this.capture.bind(this)}  bsStyle="primary">Capture</Button>
                            <Button onClick={this.handleSubmitImage.bind(this)} bsStyle="success">Submit</Button>
                            <Button onClick={this.handleClosePicModal.bind(this)}>Close</Button>
                        </Modal.Footer>

                    </Modal>
                
                
            </Navbar>    
        
        
        )
    }
} 

export default Toolbar;



