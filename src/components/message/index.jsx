import React,{Component} from 'react';
import { List , Badge} from 'antd-mobile';
import Cookies from 'js-cookie';
import PropTypes from 'prop-types';

const Item = List.Item;
const Brief = Item.Brief;

class Message extends Component{
    static propTypes = {
        chatList : PropTypes.object.isRequired
    }
    goChat = (id) => {
        this.props.history.push(`/chat/${id}`)
    };

    render () {
        //获取当前用户
        const userid = Cookies.get('userid');
        //从对话列表中找到所有通话的用户
        const {users,chatMsgs} = this.props.chatList;
        //从每一个chatMsgs中的对象，找到from to与userid不同的id值
        //过滤掉相同id值，相同的id值只保留一个
        let users_id = {}
        console.log(chatMsgs);
        chatMsgs.forEach((item,index) => {
            const othersId = item.from === userid ? item.to : item.from;
            //把正确ID的header和username克隆到新对象中
            if (!users_id[othersId]) {
                users_id[othersId] = {};
            }
            for (let key in users[othersId]) {
                users_id[othersId][key] = users[othersId][key];
            }
            //为了方便后面取id值，在给这个对象添加一个id
            users_id[othersId].id = othersId;
            //展示单个列表的未读消息
            if (!users_id[othersId].unRead) {
                users_id[othersId].unRead = 0;
            }
            if (item.from === othersId && !item.read) {
                users_id[othersId].unRead++;
            }

            const time = Date.parse(item.createTime);
            if (users_id[othersId].time) {
                //说明之前添加过数据，将现在的数据和之前的数据进行比较
                if (users_id[othersId].time < time) {
                    users_id[othersId].time = time;
                    users_id[othersId].message = item.message;
                }
            } else {
                users_id[othersId].time = time;
                users_id[othersId].message = item.message;
            }


        })
        const arr = Object.values(users_id);
        return(
            <div>
                <List  className="my-list">

                    {
                        arr.map(((item,index )=> (
                            <Item
                                key={index}
                                onClick={this.goChat.bind(null,item.id)}
                                arrow="horizontal"
                                thumb={require(`../../assets/images/头像${(item.header === 'undefined' ? 1 : +item.header+1)}.png`)}
                                multipleLine
                                extra={<Badge text={item.unRead}/>}
                            >
                                {item.message}
                                <Brief>{item.username}</Brief>
                            </Item>
                        )))
                    }

                </List>
            </div>
        )
    }
}
export default Message;