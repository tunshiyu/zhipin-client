import {connect} from 'react-redux';
import Message from '../components/message';


export default connect(
    state => ({chatList : state.chatList}),
    {}
)(Message)