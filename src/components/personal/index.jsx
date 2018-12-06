import React,{Component} from 'react';
import { List,Result, WhiteSpace,Button,Modal} from 'antd-mobile';
import Cookies from 'js-cookie';

const alert = Modal.alert;

const Item = List.Item;
const Brief = Item.Brief;

class Personal extends Component{
    render () {
        return(
            <div>
                <Result
                    img={<img src={require('../../assets/images/头像1.png')} alt="头像"/>}
                    title="dashen1"
                />
                <WhiteSpace />
                <List renderHeader={() => '相关信息'}>
                <Item
                    // arrow="horizontal"
                    multipleLine
                    onClick={() => {}}
                    platform="android"
                >
                    <Brief>职位：web前端</Brief>
                    <Brief>简介 ：React全家桶</Brief>
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
                                //跳转到login页面
                                this.props.history.replace('/login');
                                } },
                        ])
                    }
                >
                    confirm
                </Button>

            </div>
        )
    }
}
export default Personal;