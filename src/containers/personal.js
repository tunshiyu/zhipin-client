import {connect} from 'react-redux';
import Personal from '../components/personal';
import {resetUserList,resetUserInfo} from '../redux/actions';

export default connect(
    //将状态和方法映射成属性传递给UI组件
    state => ({user : state.user}),
    {resetUserList,resetUserInfo}
)(Personal)