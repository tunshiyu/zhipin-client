import React from 'react';
import ReactDom from 'react-dom';
import {HashRouter,Route,Switch} from 'react-router-dom'
import {Provider} from 'react-redux';

import store from '../src/redux/store'
import Main from '../src/components/main';
import Login from '../src/containers/login';
import Register from './containers/register';
import  './assets/index.less';



ReactDom.render(
    <Provider store={store}>
        <HashRouter>
            <Switch>
                <Route path={'/login'} component={Login}/>
                <Route path={'/register'} component={Register}/>
                <Route path={'/'} component={Main}/>
            </Switch>
        </HashRouter>
    </Provider>

    ,document.getElementById('root'));
