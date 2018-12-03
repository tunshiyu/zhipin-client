import React,{Component} from 'react';
import {Button, InputItem, List, NavBar, WhiteSpace, WingBlank} from 'antd-mobile';
import Logo from "../logo";

class Login extends Component{
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
    render () {

        return(
            <div>
                <NavBar>硅谷直聘</NavBar>
                <Logo/>
                <WingBlank>
                    <List>
                        <InputItem onChange={val => this.handleData('username',val)}>用户名&nbsp;:</InputItem>
                        <WhiteSpace/>
                        <InputItem type="password" onChange={val => this.handleData('pwd',val)}>密 &nbsp;&nbsp;&nbsp;码&nbsp;:</InputItem>
                        <WhiteSpace/>

                        <Button type="primary">登陆</Button>
                        <Button onClick={this.toRegister}>还没有账户</Button>
                    </List>
                </WingBlank>
            </div>
        )
    }
}
export default Login;