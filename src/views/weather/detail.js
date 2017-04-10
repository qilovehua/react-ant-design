import React, { Component } from 'react';
import $ from 'jquery';
import echarts from 'echarts';
import _ from 'lodash';

class WeatherDetail extends Component {

    constructor(props) {
        super(props);
        this.state = {
        }
    }

    componentDidMount(){
        $('body').animate({scrollTop: 0}, 10);
        var state = this.props.location.state;
        console.log('weather detail - ', state);
        if(state && state.detail){
            var params = this.format(state.detail);
            this.showChart(params);
        }
    }

    format(detail){
        var week = [],
            high = [],
            low = [];
        if(detail && detail.length){
            for(let item in detail){
                console.log(detail[item]);
                var value = detail[item];
                week.push(value.date.slice(0, 2));
                var reg = /(-?\d+) ~ (-?\d+)℃/;
                var result = reg.exec(value.temperature);
                if(result){
                    if(result[1] > result[2]) {
                        low.push(result[2]);
                        high.push(result[1]);
                    }else{
                        low.push(result[1]);
                        high.push(result[2]);
                    }
                }
            }
        }
        return {week, high, low};
    }

    showChart(params){
        console.log('===params', params);
        var option = {
            title: {
                text: '未来三天气温变化',
                subtext: '来自百度API'
            },
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                data:['最高气温','最低气温']
            },
            toolbox: {
                show: true,
                feature: {
                    dataZoom: {
                        yAxisIndex: 'none'
                    },
                    dataView: {readOnly: false},
                    magicType: {type: ['line', 'bar']},
                    restore: {},
                    saveAsImage: {}
                }
            },
            xAxis:  {
                type: 'category',
                boundaryGap: false,
                data: params.week,
            },
            yAxis: {
                type: 'value',
                axisLabel: {
                    formatter: '{value} °C'
                }
            },
            series: [
                {
                    name:'最高气温',
                    type:'line',
                    data: params.high,
                    markPoint: {
                        data: [
                            {type: 'max', name: '最大值'},
                            {type: 'min', name: '最小值'}
                        ]
                    },
                    markLine: {
                        data: [
                            {type: 'average', name: '平均值'}
                        ]
                    }
                },
                {
                    name:'最低气温',
                    type:'line',
                    data: params.low,
                    markPoint: {
                        data: [
                            {name: '周最低', value: _.min(params.low), xAxis: _.indexOf(params.low, _.min(params.low)), yAxis: _.min(params.low)}
                        ]
                    },
                    markLine: {
                        data: [
                            {type: 'average', name: '平均值'},
                            [{
                                symbol: 'none',
                                x: '90%',
                                yAxis: 'max'
                            }, {
                                symbol: 'circle',
                                label: {
                                    normal: {
                                        position: 'start',
                                        formatter: '最大值'
                                    }
                                },
                                type: 'max',
                                name: '最高点'
                            }]
                        ]
                    }
                }
            ]
        };
        var myChart = echarts.init(document.getElementById('weather-detail'));
        myChart.setOption(option);
    }

    render() {
        return (
            <div className="weather-wrap">
                <div id="weather-detail"/>
            </div>
        );
    }
}

export default WeatherDetail;
