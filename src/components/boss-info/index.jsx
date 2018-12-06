import React,{Component} from 'react';
import {NavBar, InputItem, TextareaItem, Button} from 'antd-mobile';
import HeaderSelector from '../header-selector';
import PropTypes from 'prop-types';
import {Redirect} from 'react-router-dom';


class BossInfo extends Component{
    static propTypes = {
        user : PropTypes.object.isRequired,
        update:PropTypes.func.isRequired
    }
    state = {
        header : '',
        post : '',
        company : '',
        salary : '',
        info : '',
        type : 'boss'
    };
    handleChange = (type,val) => {
        this.setState({
            [type] : val
        })
    };
    setHeader = header => {
        this.setState({
            header
        })
    };
    updateUserData = () => {
    //    开始一套操作  首先去actions定义
        this.props.update(this.state);
    }
    render () {
        //拿到错误信息和跳转情况
        const {errMsg,redirectTo} = this.props.user;
        if (redirectTo === '/boss') {
            return <Redirect to={redirectTo}/>
        }
        return(
            <div>
                <p className="err">{errMsg}</p>
                <NavBar>老板信息完善</NavBar>
                <HeaderSelector setHeader={this.setHeader}/>
                <InputItem onChange={val => {this.handleChange('post', val)}}>招聘职位:</InputItem>
                <InputItem onChange={val => {this.handleChange('company', val)}}>公司名称:</InputItem>
                <InputItem onChange={val => {this.handleChange('salary', val)}}>职位薪资:</InputItem>
                <TextareaItem title="职位要求:" rows={3} onChange={val => {this.handleChange('info', val)}}/>
                <Button type='primary' onClick={this.updateUserData}>保存</Button>
            </div>
        )
    }
}
export default BossInfo;