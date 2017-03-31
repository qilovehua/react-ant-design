
import Fetch from '../util/fetch';
import Config from '../config/url';

class Weather {

    /*
     params: {}
     */
    static getWeather(params) {
        return Fetch.getByJsonp(Config.weather, params).then((result)=>{
            return {...result.results[0], date: result.date};
        });
    }

    static getCity(){
        return Fetch.getByJsonp(Config.city).then((result)=>{
            console.log('===city', result);
            return result;
        });
    }

}

export default Weather;