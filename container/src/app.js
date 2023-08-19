import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import {StylesProvider, createGenerateClassName} from '@material-ui/core/styles';

import Header from './components/Header'
import MarketingApp from './components/marketing';
import AuthApp from './components/auth';

const generateClassname = createGenerateClassName({
    productionPrefix: 'co'
})

export default () =>

<BrowserRouter>
    <StylesProvider generateClassName={generateClassname}>
        <div>
           <Header/>
            <Switch>
                <Route path='/auth' component={AuthApp}></Route>
                <Route path='/' component={MarketingApp}></Route>
            </Switch>
        </div> 
    </StylesProvider>
</BrowserRouter>




