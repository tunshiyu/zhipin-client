import {connect} from 'react-redux';
import BossInfo from '../components/boss-info';
import {update} from '../redux/actions';

export default connect(
    state => ({user : state.user}),
    {update}
)(BossInfo)