import React, { Component } from 'react';
import { Row, Col, Panel, Grid } from 'react-bootstrap';
import aja from 'aja'

class ImageBoard extends Component {
    
    constructor(){
        super()
        this.state = {
            allImages: []
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
                _this.setState({allImages: data})
            })
            .go()
            
    }
    
    
    
    render() {
        return (
            <div style= {{marginTop: "150px"}}>
                {this.state.allImages.map(function(image){
                    return(
                        <Col md={4}>
                            <Panel>
                                <img src = {"http://localhost:8080/public/" + image._id + ".jpg"}/>
                            </Panel>
                        </Col>
                    )
                })}
            </div>
        );
    }
}

export default ImageBoard;
