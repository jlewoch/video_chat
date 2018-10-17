import React, { Component } from 'react';

class Test extends Component {
    componentDidMount() {
        this.remote.srcObject = this.props.stream
    }
    
    render() {
        return (

            <video style={{height:'200px', width: '300px'}} ref={el => (this.remote = el)} autoPlay />
 
        );
    }
}

export default Test;