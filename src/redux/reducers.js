/*
  作用：根据之前的状态（previousState）和更新数据的行为（action）产生一个新的状态（newState）
 */
import {combineReducers} from 'redux';
import {AUTH_SUCCESS,
    AUTH_ERROR,
    UPDATE_USER_INFO,
    RESET_USER_INFO,
    UPDATE_USER_LIST,
    RESET_USER_LIST} from './action-types';

//初始化状态的值
const initUserState = {
    username : '',
    type : '',
    _id : '',
    errMsg : '',
    redirectTo : '',
    header : '',
    post : '',
    company : '',
    salary : '',
    info : ''
}
function user(previousState = initUserState, action) {
    switch (action.type) {
        case AUTH_SUCCESS :
            return {...action.data,redirectTo: getRedirectToPath(action.data.type,action.data.header)}
        case AUTH_ERROR :
            return {...initUserState,...action.data}
        case UPDATE_USER_INFO :
            return {...action.data,redirectTo: getRedirectToPath(action.data.type,action.data.header)}
        case RESET_USER_INFO:
            return {...initUserState,...action.data}
        default :
            return previousState;
    }
}

const initState = [];
function userList(previousState = initState, action) {
    switch (action.type) {
        case UPDATE_USER_LIST:
            return action.data
        case RESET_USER_LIST:
            return [];
        default :
            return previousState;
    }
}

function getRedirectToPath(type,header) {
    let path = '';

    if (type === 'boss') {
        path = '/boss';
    } else {
        path = '/dashen';
    }

    if (!header) {
        path += 'info';
    }

    return path;
}

//默认暴露合并后的reducers函数
// {xxx: function xxx() {}, yyy: function yyy() {}}
export default combineReducers({
    user,
    userList
})