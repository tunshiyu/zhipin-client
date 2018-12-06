import axios from 'axios';

export default async function (url,data,method = 'GET') {
    //处理传来的data
    let q = '';
    if (data){
        //{a,b}转换成  username=a&pwd = b
        const arr = Object.keys(data);

        arr.forEach(key => {
            q += `${key}=${data[key]}&`;
        });
    //    去掉最后有一个&
        q=q.substring(0,q.length-1);
    }
     //    判断请求方式
    const type = method.toUpperCase();
    if(type === 'GET'){

        return  axios.get(url+'?'+q);
    }else if (type === 'POST') {
        return axios.post(url, q, { 'content-type': 'application/x-www-form-urlencoded'});
    }
}