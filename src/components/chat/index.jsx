/*
对话聊天的路由组件
 */

import React, {Component} from 'react'
import {NavBar, List, InputItem, Icon, Grid} from 'antd-mobile';
import PropTypes from 'prop-types';
import Cookies from 'js-cookie';

import './index.less';
//UI需要用的元素
const Item = List.Item;


export default class Chat extends Component {
    static propTypes = {
        sendMessage : PropTypes.func.isRequired,
        chatList : PropTypes.object.isRequired
    }
    state = {
        message: '',
        isShow : false
    };
    //左上角回退
    goBack = () => {
        this.props.history.goBack();
    };

    handleChange = val => {
        this.setState({
            message : val
        })
    };
    sendMessage = () => {
        //获取发送消息的ID，应该为cokie里的userid,即自己发送
        const from = Cookies.get('userid')
        //获取接受消息的ID，即点击时设置到URL的item.id
        const to = this.props.match.params.id;
        const {message} = this.state;
        console.log(message);
        console.log(from);
        console.log(to);
        this.props.sendMessage({message,from,to});
    //    清空message状态
        this.setState({
            message : '',
            isShow : false,
        })
    };
    //点击弹出表情列表
    showToggle = () => {
        this.setState({
            isShow : !this.state.isShow
        })
        console.log(this.state.isShow);
    }

    //第一次渲染和重新渲染都需要自动滚到底部
    componentDidMount (){
        window.scrollTo(0,document.body.offsetHeight)
    }
    componentDidUpdate (){
        window.scrollTo(0,document.body.offsetHeight)
    }

    //表情
    componentWillMount () {
        const emojis = ['😀', '😁', '🤣','😀', '😁', '🤣','😀', '😁', '🤣','😀', '😁', '🤣','😀'
            ,'😁', '🤣','😀', '😁', '🤣','😀', '😁', '🤣','😀', '😁', '🤣'
            ,'😁', '🤣','😀', '😁', '🤣','😀', '😁', '🤣','😀', '😁', '🤣'
            ,'😁', '🤣','😀', '😁', '🤣','😀', '😁', '🤣','😀', '😁', '🤣', '🙉'];
        this.emojis = emojis.map(item => ({text: item}));
    }

    render() {
        const {users,chatMsgs} = this.props.chatList;
        //发送方ID
        const from = Cookies.get('userid');
        //接收方ID
        const to = this.props.match.params.id;
        const others = users[to];
        if(!others){
            return null;
        }
        const from_to = [from,to].sort().join('-');
        //过滤出与当前用户相关的消息
        const currMsgs = chatMsgs.filter(item => item.from_to === from_to);
        //消息按照时间顺序排序
        currMsgs.sort(function (a, b) {
            return Date.parse(a.createTime) - Date.parse(b.createTime)
        })
        return (
            <div id='chat-page'>
                {/*顶部*/}
                <NavBar style={{position:'fixed',left:'0',top:'0',width:'100%',zIndex:20}} icon={<Icon type="left" onClick={this.goBack}/>}>{others.username}</NavBar>
                {/*中间聊天信息*/}
                <List>
                    {
                        currMsgs.map((item,index) => {
                            if(item.from === from){
                                return <Item
                                    key={index}
                                    className='chat-me'
                                    extra='我'
                                >
                                    {item.message}
                                </Item>
                            }
                            else {
                                return (
                                    <Item
                                        key={index}
                                        thumb={require(`../../assets/images/头像${+others.header+1}.png`)}
                                    >
                                        {item.message}
                                    </Item>
                                )
                            }
                        })
                    }
                </List>

                {/*底部组件*/}
                <div className='am-tab-bar'>
                    <InputItem
                        value={this.state.message}
                        placeholder="请输入"
                        onChange={this.handleChange}
                        extra={
                            <div>
                                <span onClick={this.showToggle} style={{marginRight:'10px'}}>😀</span>
                                <span onClick={this.sendMessage}>发送</span>
                            </div>

                        }
                    />
                </div>
            {/*表情列表*/}
                 { this.state.isShow ?
                        <Grid
                        data={this.emojis}
                        isCarousel
                        columnNum={8}
                        carouselMaxRow={4}
                        onClick={el => {this.setState({message: this.state.message + el.text})}}
                    />
                         : null}
            </div>
        )
    }
}