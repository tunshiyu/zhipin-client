import React,{Component} from 'react';
import { Card, WingBlank, WhiteSpace } from 'antd-mobile';
class Boss extends Component{
    render () {
        return(
            <div>
                <WhiteSpace></WhiteSpace>
                <WingBlank>
                    <Card>
                        <Card.Header
                            thumb={require('../../assets/images/头像1.png')}
                            extra={<span>BOSS1</span>}
                        />
                        <Card.Body>
                            <div>职位 ：WEB前端</div>
                            <div>月薪 ： 16K</div>
                            <div>公司 ：Goole</div>
                        </Card.Body>
                    </Card>
                </WingBlank>

            </div>
        )
    }
}
export default Boss;