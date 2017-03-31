import React, { Component } from 'react';

import _ from 'lodash';
import {Card, Collapse} from 'antd';
const Panel = Collapse.Panel;
import WeatherModel from '../../model/weather';

class Weather extends Component {

    constructor(props) {
        super(props);
        this.page = 1;
        this.state = {
            infos: {},
        }
    }

    componentDidMount(){
        WeatherModel.getWeather().then((infos)=>{
            console.log('hahah', infos);
            this.setState({
                infos,
            });
        }).catch(()=>{

        });
    }

    getPM25(pm25) {
        if (pm25 === -1) {
            return '未知';
        }else if(pm25 < 34) {
            return '优';
        } else if (pm25 < 75) {
            return '良';
        } else if (pm25 < 115) {
            return '轻度污染';
        } else if (pm25 < 150){
            return '中度污染';
        } else if(pm25 < 250) {
            return '重度污染';
        } else if(pm25 >= 250) {
            return '严重污染';
        }
    }

    render(){
        var {infos} = this.state;
        if(!_.size(infos)){
            return <div>loading...</div>
        }
        this.getPM25(parseInt(infos.pm25 || 0));
        return (
            <div className="weather">
                <Card title={(infos.currentCity || '') + "天气"} className="weather-container" extra={<a href="#">更多详情</a>}>
                    <p>{infos.weather_data[0].date}</p>
                    <p>实时空气质量: {infos.pm25 + ' (' + this.getPM25(infos.pm25) + ')'}</p>
                    <p>{infos.weather_data[0].weather}</p>
                    <p>{infos.weather_data[0].wind}</p>
                    <p>{infos.weather_data[0].temperature}</p>
                </Card>
                <br/>
                <Collapse>
                    {
                        _.map(infos.index||[], (info, index)=>{
                            return (
                                <Panel header={info.title + ' - ' + info.zs} key={index}>
                                    <p>{info.tipt + ': ' + info.des}</p>
                                </Panel>
                            )
                        })
                    }
                </Collapse>
            </div>
        );
    }
}

export default Weather;