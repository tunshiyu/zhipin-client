import React,{Component} from 'react';
import { List } from 'antd-mobile';

const Item = List.Item;
const Brief = Item.Brief;

class Message extends Component{
    render () {
        return(
            <div>
                <List  className="my-list">
                    <Item
                        arrow="horizontal"
                        thumb={require('../../assets/images/头像1.png')}
                        multipleLine>
                        简历已发送到您的邮箱<Brief>大神</Brief>
                    </Item>
                </List>
            </div>
        )
    }
}
export default Message;