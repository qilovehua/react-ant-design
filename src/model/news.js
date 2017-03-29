
import Fetch from '../util/fetch';
import Config from '../config/url';

class News {

    /*
        params: {tableNum, page, pagesize}
     */
    static getNewsList(params) {
        return Fetch.get(Config.newsList, params);
    }
}

export default News;