import React,{Component} from 'react';
import {TabBar} from 'antd-mobile';
import PropTypes from 'prop-types';
import './index.less';
import {withRouter}from 'react-router-dom'


class Footer extends Component{
    static propTypes = {
        navList : PropTypes.array.isRequired,
        user : PropTypes.object.isRequired
    }
    redirectTo = path => {
        this.props.history.push(path)
    }
    render () {
        const Item = TabBar.Item;
        //获取type
        const type = this.props.user.type;
        //过滤navList
        const filter = type === 'boss' ? '/dashen' : '/boss';
        const newNavList = this.props.navList.filter(item => item.path === filter ? false : true);
        return(
            <div>
                <TabBar>
                    {
                        newNavList.map((item,index) => <Item
                            key={index}
                            title={item.text}
                            icon={<img className='footer-img' src={require(`./images/${item.icon}.png`)} alt={item.text}/>}
                            onPress={this.redirectTo.bind(null,item.path)}
                            selected={this.props.location.pathname === item.path}
                            selectedIcon={<img className='footer-img' src={require(`./images/${item.icon}-selected.png`)} alt={item.text}/>}
                        />)
                    }
                </TabBar>
            </div>
        )
    }
}
//将一般组件包装成路由组件
export default withRouter(Footer);