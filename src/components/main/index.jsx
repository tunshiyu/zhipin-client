import React,{Component} from 'react';
import {Route,Redirect} from 'react-router-dom';
import DashenInfo from '../../containers/dashen-info';
import BossInfo from '../../containers/boss-info';
import Boss from '../boss';
import Message from '../message';
import Personal from '../personal';
import Cookies from 'js-cookie';
import {NavBar} from 'antd-mobile';
import Footer from '../footer';

class Main extends Component{
    navList = [
        {path : '/boss',tittle : '大神列表',icon : 'laoban',text :'大神'},
        {path : '/dashen',tittle : '老板列表',icon : 'dashen',text :'老板'},
        {path : '/message',tittle : '消息列表',icon : 'message',text :'消息'},
        {path : '/personal',tittle : '个人中心',icon : 'personal',text :'个人中心'},

    ]

    render () {
        //判断用户是否有登录行为，如果未登录转到登录界面
        //不能用状态的原因是刷新页面状态就消失了
        const userid = Cookies.get('userid');
        if(!userid){
            return <Redirect to='/login'/>
        }
        const {pathname} = this.props.location;
        const current= this.navList.find(item => item.path === pathname)
        return(
            <div>
                {current ? <NavBar>{current.tittle}</NavBar> : null}
                <Route path='/bossinfo' component={BossInfo}/>
                <Route path='/dasheninfo' component={DashenInfo}/>
                <Route path='/boss' component={Boss}/>
                <Route path='/message' component={Message}/>
                <Route path='/personal' component={Personal}/>
                <Footer navList={this.navList}>底部</Footer>
            </div>
        )
    }
}
export default Main;

//在做老板信息界面，需要在main里引入