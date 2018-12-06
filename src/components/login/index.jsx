import React,{Component} from 'react';
import {Button, InputItem, List, NavBar, WhiteSpace, WingBlank} from 'antd-mobile';
import Logo from "../logo";
import PropTypes from 'prop-types';
import {Redirect} from 'react-router-dom'

class Login extends Component{
    static propTypes = {
        user : PropTypes.object.isRequired,
        login : PropTypes.func.isRequired
    }
    state ={
        username : '',
        pwd : '',
    }

    handleData = (inputType,val) => {
        this.setState({
            [inputType] : val
        })
    };
    toRegister = () => {
        this.props.history.push('/register')
    };
    login = async () => {
        const {username,pwd} = this.state;
        this.props.login({username,pwd})
    }
    render () {
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

                        <Button type="primary" onClick={this.login}>登陆</Button>
                        <Button onClick={this.toRegister}>还没有账户</Button>
                    </List>
                </WingBlank>
            </div>
        )
    }
}
export default Login;