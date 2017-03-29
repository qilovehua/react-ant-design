
import Fetch from '../util/fetch';
import Config from '../config/url';

class News {

    /*
        params: {tableNum, page, pagesize}
     */
    static getNewsList(params) {
        return Fetch.getByJsonp(Config.newsList, params).then((result)=>{
            return result.data;
        });
        // 此API服务端不支持CORS，无法跨域
        // return Fetch.get(Config.newsList, params);
    }
}

export default News;