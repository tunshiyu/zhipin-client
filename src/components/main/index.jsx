import React,{Component} from 'react';
import {Route,Redirect} from 'react-router-dom';
import PropTypes from 'prop-types';
import DashenInfo from '../../containers/dashen-info';
import BossInfo from '../../containers/boss-info';
import Boss from '../../containers/boss';
import Message from '../message';
import Personal from '../../containers/personal';
import Cookies from 'js-cookie';
import {NavBar} from 'antd-mobile';
import Footer from '../footer';
import './index.less';

class Main extends Component{
    static propTypes = {
        user : PropTypes.object.isRequired,
        getUserInfo: PropTypes.func.isRequired
    }
    navList = [
        {path : '/boss',tittle : '大神列表',icon : 'laoban',text :'大神'},
        {path : '/dashen',tittle : '老板列表',icon : 'dashen',text :'老板'},
        {path : '/message',tittle : '消息列表',icon : 'message',text :'消息'},
        {path : '/personal',tittle : '个人中心',icon : 'personal',text :'个人中心'},

    ]

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
                    <Route path='/message' component={Message}/>
                    <Route path='/personal' component={Personal}/>
                </div>
                {current ? <Footer navList={this.navList}>底部</Footer> : null}
            </div>
        )
    }
}

export default Main