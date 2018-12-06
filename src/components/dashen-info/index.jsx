import React,{Component} from 'react';
import {NavBar, InputItem, TextareaItem, Button} from 'antd-mobile';
import HeaderSelector from '../header-selector';
import PropTypes from 'prop-types';
import {Redirect} from 'react-router-dom';


class DashenInfo extends Component{
    static propTypes = {
        user : PropTypes.object.isRequired,
        update:PropTypes.func.isRequired
    }
    state = {
        header : '',
        post : '',
        info : '',
        type : 'dashen'
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
        if (redirectTo === '/dashen') {
            return <Redirect to={redirectTo}/>
        }
        return(
            <div>
                <p className="err">{errMsg}</p>
                <NavBar>大神信息完善</NavBar>
                <HeaderSelector setHeader={this.setHeader}/>
                <InputItem onChange={val => {this.handleChange('post', val)}}>求职岗位:</InputItem>

                <TextareaItem title="个人介绍:" rows={3} onChange={val => {this.handleChange('info', val)}}/>
                <Button type='primary' onClick={this.updateUserData}>保存</Button>
            </div>
        )
    }
}
export default DashenInfo;