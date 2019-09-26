import Axios from 'axios';

//axios全局配置
Axios.interceptors.request.use(function (config) {
  config.headers = {
    'Accept': "application/json, text/plain, */*",
    'Content-Type': "application/json;charset=utf-8",
    'Authorization': ''
    // 'Authorization': sessionStorage.getItem('Authorization')
  };
  config.timeout = 3000;
  // config.baseURL = 'http://server.natappfree.cc:43970';
  return config;
});
Axios.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  return response;
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error);
});

// get、post请求封装
const axios = {
  // get: (path, params, config) => {
  //   const time = new Date().getTime();
  //   return Axios.get('/Tenant/GetCustomize?customizeType=1&v='+ time);
  // }
  POST: (path, params, config) =>{
    return Axios.post(path, params, {...config});
  },
  GET: (path, params, config) => {
    let req_data = [];
    if(params !== null && params !== undefined){
      Object.keys(params).forEach(key => {
        req_data.push(key + '=' + params[key]);
      });
    }
    if(config !== null && config !== undefined){
      return Axios.get((path + "?" + req_data.join('&')),{...config});
    }
    else {
      return Axios.get((path + "?" + req_data.join('&')));
    }
  },
  ALL: (...actions) => {
    return Axios.all(actions);
  }
};

export default axios;