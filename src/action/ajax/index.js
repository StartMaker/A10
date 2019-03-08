import Axios from 'axios';
import {Events} from '../event';
import {getRegisterAction,getLoginAction} from '../async';

/*请求列表-发起请求*/
export const Register = (action,dispatch) => {
    /*请求发起*/
    dispatch(RequestPost(getRegisterAction(action)));
    return AxiosRequest(getRegisterAction(action),dispatch);
};
// export const Login = (action,dispatch) =>{
//     dispatch(RequestPost(getLoginAction(action)));
//     return AxiosRequest(getLoginAction(action),dispatch);
// };

export const Login = action => dispatch =>{
    dispatch(RequestPost(getLoginAction(action)));
    return dispatch(AxiosRequest(getLoginAction(action)));
};


/*封装Axios*/
const AxiosRequest = action => dispatch => {
    console.log(dispatch);
    return Axios(getAxiosData(action))
        .then(function (Response) {
            const {code,data} = Response;
            switch (code) {
                case '200':
                    return dispatch(RequestReceive(action,data));
                default:
                    console.log(Response);
            }
        })
        .catch(function (reason) {
            dispatch(RequestFail(action,reason));
        });
};

/*异步封装*/
const getAxiosData = (action) => {
      switch (action.todo) {
          case Events.REGISTER:
              return Object.assign(action.data , AXIOS_CONFIG_NORMAL);
          case Events.LOGIN:
              return Object.assign(action.data , AXIOS_CONFIG_NORMAL);
      }
};

let AXIOS_CONFIG_NORMAL = {
    method: 'post',
    headers: {
        token: sessionStorage.getItem('token')
    }
};

/*请求状态*/
export const REQUEST_POST = 'REQUEST_POST';
export const REQUEST_RECEIVE = "REQUEST_RECEIVE";
export const REQUEST_FAIL = 'REQUEST_FAIL';

/*发送请求*/
const RequestPost = (action) =>{
    const {data,todo} = action;
    return {
        isAxios: true,
        date: Date.now(),
        request: data,
        type: REQUEST_POST,
        todo: todo
    };
};
/*请求失败*/
const RequestFail = (action,reason) =>{
    const {data,todo} = action;
    return {
        isAxios: true,
        date: Date.now(),
        type: REQUEST_FAIL,
        data: data,
        todo: todo,
        reason: reason
    };
};

/*请求成功*/
const RequestReceive = (action,response) =>{
    console.log(action);
    console.log(response);
    const {data,todo} = action;
    return {
        isAxios: true,
        date: Date.now(),
        type: todo,
        data: data,
        response: response
    };
};

/*浏览器存储*/
function storeToBrowser(info) {
    sessionStorage.setItem('username',info.username);
    sessionStorage.setItem('token',info.token);
}