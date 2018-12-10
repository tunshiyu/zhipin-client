import React,{Component} from 'react';
import {Route,Redirect} from 'react-router-dom';
import PropTypes from 'prop-types';
import Cookies from 'js-cookie';
import './index.less';

import BossInfo from '../../containers/boss-info';
import Boss from '../../containers/boss';

import DashenInfo from '../../containers/dashen-info';
import Dashen from '../../containers/dashen';

import Message from '../../containers/message';
import Personal from '../../containers/personal';

import Chat from '../../containers/chat';

import {NavBar} from 'antd-mobile';
import Footer from '../footer';


class Main extends Component{
    static propTypes = {
        user : PropTypes.object.isRequired,
        getUserInfo: PropTypes.func.isRequired,
        getChatList: PropTypes.func.isRequired
    }
    navList = [
        {path : '/boss',tittle : '大神列表',icon : 'laoban',text :'大神'},
        {path : '/dashen',tittle : '老板列表',icon : 'dashen',text :'老板'},
        {path : '/message',tittle : '消息列表',icon : 'message',text :'消息'},
        {path : '/personal',tittle : '个人中心',icon : 'personal',text :'个人中心'},

    ]

    componentDidMount () {
        //获取chatlist并不是main使用，而是将状态更新给message组件
        this.props.getChatList();
    }

    render () {
        //通过cookie判断用户是否有登录行为，如果未登录转到登录界面

        const userid = Cookies.get('userid');
        if(!userid){
            return <Redirect to='/login'/>
        }
        //如果有cookies没有状态的话向服务器发送请求重新获取状态
        if(!this.props.user._id){
            this.props.getUserInfo();
        }
        //如果直接访问 /  上面保证了有redux和cokie
        const {pathname} = this.props.location;
        if(pathname === '/'){
            return <Redirect to={this.props.user.redirectTo} />
        }

        const current= this.navList.find(item => item.path === pathname)
        return(
            <div>
                {current ? <NavBar className='navbar'>{current.tittle}</NavBar> : null}
                <Route path='/bossinfo' component={BossInfo}/>
                <Route path='/dasheninfo' component={DashenInfo}/>
                <div className='main-content'>
                    <Route path='/boss' component={Boss}/>
                    <Route path='/dashen' component={Dashen}/>
                    <Route path='/message' component={Message}/>
                    <Route path='/personal' component={Personal}/>
                    <Route path='/chat/:id' component={Chat}/>
                </div>
                {current ? <Footer navList={this.navList} user={this.props.user}>底部</Footer> : null}
            </div>
        )
    }
}

export default Main