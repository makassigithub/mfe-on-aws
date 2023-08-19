import React, {Suspense, lazy} from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import {StylesProvider, createGenerateClassName} from '@material-ui/core/styles';
import Header from './components/Header';
import Progress from './components/Progress';

const LazyAuth = lazy(()=> import('./components/auth'));
const LazyMarketing = lazy(()=> import('./components/marketing'));

const generateClassname = createGenerateClassName({
    productionPrefix: 'co'
})

export default () =>

<BrowserRouter>
    <StylesProvider generateClassName={generateClassname}>
        <div>
           <Header/>
           <Suspense fallback={<Progress/>}>
           <Switch>
                <Route path='/auth' component={LazyAuth}></Route>
                <Route path='/' component={LazyMarketing}></Route>
            </Switch>
           </Suspense>
        </div> 
    </StylesProvider>
</BrowserRouter>




