import 'whatwg-fetch';
import _ from 'lodash';

function checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
        return response
    } else {
        var error = new Error(response.statusText);
        error.response = response;
        throw error
    }
}

var checkResult = function(result) {
    console.log('checkResult: ' + JSON.stringify(result));
    if (result.Rc === 0) {
        return result;
    } else {
        throw new Error(JSON.stringify(result));
    }
};

var checkError = function(url, error){
    console.error(url, 'checkError: ', error);
    throw error;
};

function parseJSON(response) {
    return response.json()
}

function fetchAPI(url, method, params) {
    console.log('method: ', method, 'url: ', url);
    var myRequest = {};
    myRequest.url = url;
    if (method === 'POST'){
        myRequest = {
            ...myRequest,
            method: method,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(params)
        };
    }else{
        var query = [];
        var keys = _.keys(params);
        _.map(keys, function (key, index) {
            query.push(key + '=' + params[key]);
        });
        if(query.length){
            myRequest.url += '?' + query.join('&');
        }
    }
    console.log(myRequest.url);
    myRequest.mode = 'no-cors';
    myRequest.cache = 'default';
    myRequest.credentials = 'include'; //跨域需要携带cookie
    return fetch(myRequest.url, myRequest)
        .then(checkStatus)
        .then(parseJSON)
        .then(checkResult)
        .catch((error)=>{
            return checkError(url, error);
        });
};

// 当前只支持Post、Get
function get(url, params) {
    return fetchAPI(url, 'GET', params);
};

function post(url, params) {
    return fetchAPI(url, 'POST', params);
};

export default {get, post}