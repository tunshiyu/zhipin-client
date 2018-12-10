
/*定义所有请求函数*/
import ajax from './ajax';

//接口前缀
//正常请求的配置
// const prefix = 'http://localhost:4000';
//代理服务器需要的配置
const prefix = '';

export const  reqRegister = (data) => ajax(`${prefix}/register`,data,'POST');
export const  reqLogin = (data) => ajax(`${prefix}/login`,data,'POST');
export const  reqUpdate = (data) => ajax(`${prefix}/update`,data,'POST');
export const  reqUserInfo = () => ajax(`${prefix}/user`);
export const  reqUserList = (type) => ajax(`${prefix}/userlist`,{type});
export const  reqChatList = () => ajax(`${prefix}/msglist`);
