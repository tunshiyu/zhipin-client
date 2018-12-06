import React,{Component} from 'react';
import {NavBar,InputItem,List,WingBlank, WhiteSpace,Radio,Button} from 'antd-mobile';
import Logo from '../logo';

import PropTypes from 'prop-types';
import {Redirect} from "react-router-dom";


class Register extends Component{
    static propTypes ={
        user : PropTypes.object.isRequired,
        register : PropTypes.func.isRequired
    };
    state ={
        username : '',
        pwd : '',
        repwd : '',
        boss : true
    }
    register = async () => {
        const {username,pwd,repwd,boss} = this.state;
        await this.props.register({username,pwd,repwd,type :boss? 'boss' : 'dashen'});
    }

    handleData = (inputType,val) => {
        this.setState({
            [inputType] : val
        })
    };


    toRegister = () => {
        this.props.history.push('/login')
    };

    render () {
        const Item = List.Item;
        const {errMsg,redirectTo} = this.props.user;
        if(redirectTo){
            return <Redirect  to={redirectTo} />
        }

        return(
            <div>
                <NavBar>硅谷直聘</NavBar>
                <Logo/>
                <p className='err'>{errMsg}</p>
            <WingBlank>
                <List>
                   <InputItem onChange={val => this.handleData('username',val)}>用户名&nbsp;:</InputItem>
                    <WhiteSpace/>
                    <InputItem type="password" onChange={val => this.handleData('pwd',val)}>密 &nbsp;&nbsp;&nbsp;码&nbsp;:</InputItem>
                    <WhiteSpace/>
                    <InputItem type="password" onChange={val => this.handleData('repwd',val)}>确认密码&nbsp;:</InputItem>
                    <WhiteSpace/>
                    <Item>
                        用户类型:
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <Radio onChange={() => this.handleData('boss',false)} checked={!this.state.boss}>大神</Radio>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <Radio onChange={() => this.handleData('boss',true)} checked={this.state.boss}>老板</Radio>
                    </Item>
                    <Button type="primary" onClick={this.register}>注册</Button>
                    <Button onClick={this.toRegister}>已有账户</Button>
                </List>
            </WingBlank>
            </div>
        )
    }
}
export default Register;