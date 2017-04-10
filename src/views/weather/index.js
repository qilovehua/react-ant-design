import React, { Component } from 'react';

import _ from 'lodash';
import {Link} from 'react-router';
import {Card, Collapse, notification} from 'antd';
const Panel = Collapse.Panel;
import WeatherModel from '../../model/weather';

class Weather extends Component {

    constructor(props) {
        super(props);
        this.page = 1;
        this.state = {
            infos: {},
            isError: false,
        }
    }

    componentDidMount(){
        WeatherModel.getWeather().then((infos)=>{
            console.log('hahah', infos);
            this.setState({
                infos,
            });
        }).catch(()=>{
            this.setState({
                isError: true,
            });
            notification.error({
                message: '天气加载失败',
                description: '网络问题或者接口失效了',
                duration: 2,
            });
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
        var {infos, isError} = this.state;
        this.getPM25(parseInt(infos.pm25 || 0));
        var showDetail = !isError && _.size(infos);
        return (
            <div className="weather">
                <Card title={(infos.currentCity || '') + "天气"} className="weather-container" extra={<Link to="/weather" state={{detail: infos.weather_data}}>更多详情</Link>}>
                    {isError && <div>天气加载失败</div>}
                    {!_.size(infos) && !isError && <div>loading...</div>}
                    {
                        showDetail &&
                            <div>
                                <p>{infos.weather_data[0].date}</p>
                                <p>实时空气质量: {infos.pm25 + ' (' + this.getPM25(infos.pm25) + ')'}</p>
                                <p>{infos.weather_data[0].weather}</p>
                                <p>{infos.weather_data[0].wind}</p>
                                <p>{infos.weather_data[0].temperature}</p>
                            </div>
                    }
                </Card>
                <br/>
                {
                    showDetail &&
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
                }
            </div>
        );
    }
}

export default Weather;