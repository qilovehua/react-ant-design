import React, { Component } from 'react';

class BgImage extends Component {

    render(){
        var {width, height, style, className, onClick} = this.props;
        return (
            <div className={'bg-image ' + (className || '')} style={{width, height, ...style}} onClick={()=>{onClick && onClick()}}/>
        );
    }
}

export default BgImage;