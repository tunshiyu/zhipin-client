import React,{Component} from 'react';
import { List,Result, WhiteSpace,Button,Modal} from 'antd-mobile';
import Cookies from 'js-cookie';
import PropTypes from 'prop-types';

const alert = Modal.alert;

const Item = List.Item;
const Brief = Item.Brief;

class Personal extends Component{
    static propTypes = {
        user : PropTypes.object.isRequired,
        resetUserList : PropTypes.func.isRequired,
        resetUserInfo : PropTypes.func.isRequired,
    }
    render () {
        const {info,company,salary,post,header,username} = this.props.user;
        return(
            <div>
                <Result
                    img={<img src={require(`../../assets/images/头像${+header+1}.png`)} alt=""/>}
                    title={username}
                />
                <WhiteSpace />
                <List renderHeader={() => '相关信息'}>
                <Item
                    // arrow="horizontal"
                    multipleLine
                    onClick={() => {}}
                    platform="android"
                >
                    <Brief>职位：{post}</Brief>
                    <Brief>简介 ：{info}</Brief>
                    {salary !== 'undefined' ? <Brief>薪资 ：{salary}</Brief> :null}
                </Item>
                </List>
                <Button
                    type='warning'
                    onClick={() =>
                        alert('退出登录', '确认要退出登录？', [
                            { text: 'Cancel', onPress: () => {} },
                            { text: 'Ok', onPress: () => {
                                //清除cookie
                                    Cookies.remove('userid');
                                //    清除redux信息
                                    this.props.resetUserList();
                                    this.props.resetUserInfo();
                                //跳转到login页面
                                this.props.history.replace('/login');
                                } },
                        ])
                    }
                >
                    退出登录
                </Button>

            </div>
        )
    }
}
export default Personal;