import React, { Component } from 'react';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem, Button, Modal, FormControl, ButtonGroup, DropdownButton, Col } from 'react-bootstrap';
import aja from 'aja';

class Login extends Component{
    
    constructor(){
        super();
        this.state = {
            modalShown: false,
            username: '',
            password: '',
        };
    }
    
    handleUsernameChange(event){
        this.setState({username: event.target.value});
        console.log(this.state.username);
    }
    
    handlePasswordChange(event){
        this.setState({password: event.target.value});
        console.log(this.state.password);
    }
    
     handleSignUp(){
        
        var username = this.state.username;
        var password = this.state.password
        aja()
            .method('post')
            .url('http://localhost:8080/user/signup')
            .body({username: username, password: password})
            .on('success', function(data){
              //data is a javascript object
                console.log(data);
                
                if (data.status == 200){
                    alert("You now have an account! Go login!")
                } else {
                    alert("you failed. go try again!")
                }
            })
            .go();
    }
    
    handleLogin(){
        var username = this.state.username;
        var password = this.state.password
        aja()
            .method('post')
            .url('http://localhost:8080/user/login')
            .body({username: username, password: password})
            .on('success', function(data){
                console.log(data);
                
                if (data.status == 200){
                    localStorage.setItem("session", data.data.session)
                    localStorage.setItem("userID", data.data.userID)
                    alert("Login was succesful")
                } else {
                    alert("yo something is wrong! try again")
                }
            })
            .go();
    }
    
    
    render(){
        return(
            <div>
            <jumbotron>
                <center>
                    <h1>Hello</h1>
                </center>
            </jumbotron>
            
            
            <Col md={6}>
                <h4>Sign up</h4>
                
                <FormControl
                    type="text"
                    onChange={this.handleUsernameChange.bind(this)}
                    placeholder="Username"
                />
                
                <br/>
                <FormControl
                    type="password"
                    onChange={this.handlePasswordChange.bind(this)}
                    placeholder="Password"
                />
                
                <Button onClick={this.handleSignUp.bind(this)}>Sign up</Button>
            </Col>
            
            <Col md={6}>
                <h4>Login</h4>
                <FormControl
                    type="text"
                    onChange={this.handleUsernameChange.bind(this)}
                    placeholder="Username"
                />
                
                <br/>
                <FormControl
                    type="password"
                    onChange={this.handlePasswordChange.bind(this)}
                    placeholder="Password"
                />
                
                <Button onClick={this.handleLogin.bind(this)}>Sign in</Button>
            </Col>
    
            </div>
            
        )
    }
}

export default Login;