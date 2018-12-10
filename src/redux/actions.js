
import io from 'socket.io-client';
import {reqRegister,reqLogin,reqUpdate,reqUserInfo,reqUserList,reqChatList} from '../api'
import {AUTH_SUCCESS,
    AUTH_ERROR,
    UPDATE_USER_INFO,
    RESET_USER_INFO,
    RESET_USER_LIST,
    UPDATE_USER_LIST,
    GET_CHAT_MESSAGES,
    RESET_CHAT_MESSAGES,
    UPDATA_CHAT_MESSAGES} from './action-types';

//定义同步任务
export const authSuccess = data => ({type : AUTH_SUCCESS,data})
export const authError = data => ({type : AUTH_ERROR,data})
export const updateUserInfo = data => ({type : UPDATE_USER_INFO,data});
export const resetUserInfo = data => ({type : RESET_USER_INFO,data});
export const updateUserList = data => ({type : UPDATE_USER_LIST,data});
export const resetUserList = data => ({type : RESET_USER_LIST,data});
export const getChatMessages = data => ({type : GET_CHAT_MESSAGES,data});
export const resetChatMessages = () => ({type : RESET_CHAT_MESSAGES});
export const updateChatMessages = data => ({type : UPDATA_CHAT_MESSAGES,data});
//定义异步任务
//注册
export const register = ({username,pwd,repwd,type}) => {
    console.log(repwd);
    //    表单验证
    if(!username){
        return authError({errMsg : '请输入用户名'})
    }else if(!pwd){
        return authError({errMsg : '请输入密码'})
    }else if(repwd !== pwd){
        return authError({errMsg : '两次密码输入不一致'})
    }
    return dispatch => {
    //做异步任务，发送ajax请求
        reqRegister({username,pwd,type})
            .then(({data}) => {
            //    请求成功
            //    注册成功，分发成功的action对象
                if(data.code === 0){
                    dispatch(authSuccess(data.data))
                }else{
                //    注册失败，更新状态，分发失败的action对象
                    dispatch(authError({errMsg : data.msg}))
                }
            })
            .catch(err => {
                dispatch(authError({errMsg: '网络不稳定，刷新试试'}))
            })
    }
}
//登录
export const login = ({username,pwd}) => {
    return dispatch => {
    //    发送登录的ajax请求
        reqLogin({username,pwd})
            .then(({data}) => {
                if(data.code === 0){
                    dispatch(authSuccess(data.data))
                }else {
                    dispatch(authError({errMsg : data.msg}))
                }
        })
    }
}
//完善信息
export const update = ({header, post, company, salary, info,type}) => {
    //表单验证，因为无需异步
    if(!header){
        return authError({errMsg : '请选择头像'})
    }else if(!post){
        return authError({errMsg : type === 'boss' ?'请填写招聘职位':'请输入求职岗位'})
    }else if(type === 'boss' && !company){
        return authError({errMsg : '请填写公司名称'})
    }else if(type === 'boss' && !salary){
        return authError({errMsg : '请填写职位薪资'})
    }else if(!info){
        return authError({errMsg : type === 'boss' ?'请填写职位要求' : '请填写个人简介'})
    }

    return dispatch => {
    //    发送ajax请求
        reqUpdate({header, post, company, salary, info})
            .then(({data} )=> {
                if(data.code === 0){
                    dispatch(authSuccess(data.data))
                }else {
                    dispatch(authError({errMsg : data.msg}))
                }
            })
            .catch(err => {
                dispatch(authError({errMsg : '网络原因，刷新试试'}))
            })
    }
}

//获取user信息
export const getUserInfo = () => {
    return dispatch => {
        reqUserInfo()
            .then(({data}) => {
               if(data.code === 0) {
                   dispatch(updateUserInfo(data.data))
               }else {
                   dispatch(resetUserInfo({errMsg : data.msg}))
               }
        })

            .catch(err => {
                dispatch(resetUserInfo({errMsg : '网络原因，请刷新试试'}))
            })
    }
}

//获取大神信息列表
export const getUserList = (type) => {
    return dispatch => {
        reqUserList(type)
            .then(({data}) => {
                if(data.code === 0) {
                    dispatch(updateUserList(data.data))
                }else {
                    dispatch(resetUserList())
                }
            })

            .catch(err => {
                dispatch(resetUserList())
            })
    }
}

//保证和服务器的链接只连接一次
const socket = io('ws://localhost:5000');

export const sendMessage = ({message, from, to}) => {
    return dispatch => {
        //向服务器发送了一条消息
        socket.emit('sendMsg', {message, from, to})
        console.log('浏览器端向服务器发送消息:', {message, from, to})
        if(!socket.isFirst){
            socket.isFirst = true;
            //保证只绑定一次
            socket.on('receiveMsg', function (data) {
                console.log('浏览器端接收到服务器发送的消息:', data)
            //    实时更新
                dispatch(updateChatMessages(data))
            })
        }
    }
};


//页面发送信息
export const getChatList = () => {
    return dispatch => {
        reqChatList()
            .then(({data}) => {
                if (data.code === 0){
                    return dispatch(getChatMessages(data.data))
                }
        })
            .catch(err => {
                dispatch(resetChatMessages())
            })
    }
}



