import React, { Component } from 'react';

class Weather extends Component {

    render(){
        var {width, height, style, className, onClick} = this.props;
        return (
            <div className="weather">
                weather
            </div>
        );
    }
}

export default Weather;