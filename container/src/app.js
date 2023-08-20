import React, {Suspense, lazy, useState, useEffect } from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import {StylesProvider, createGenerateClassName} from '@material-ui/core/styles';
import Header from './components/Header';
import Progress from './components/Progress';

const LazyAuth = lazy(()=> import('./components/auth'));
const LazyMarketing = lazy(()=> import('./components/marketing'));
const DashboardLazy = lazy(() => import('./components/dashboard'));

const generateClassname = createGenerateClassName({
    productionPrefix: 'co'
})

const history = createBrowserHistory();

export default () => {
    const [isSignedIn, setIsSignedIn] = useState(false);

    useEffect(() => {
        if (isSignedIn) {
          history.push('/dashboard');
        }
      }, [isSignedIn]);

  return (
    <Router history={history}>
        <StylesProvider generateClassName={generateClassname}>
            <div>
            <Header isSignedIn={isSignedIn} onSignOut={(()=> setIsSignedIn(false))}/>
            <Suspense fallback={<Progress/>}>
            <Switch>
                    <Route path='/auth'>
                        <LazyAuth onSignIn={()=> setIsSignedIn(true)} />
                    </Route>
                    <Route path="/dashboard">
                        {!isSignedIn && <Redirect to="/" />}
                        <DashboardLazy />
                    </Route>
                    <Route path='/' component={LazyMarketing}></Route>
                </Switch>
            </Suspense>
            </div> 
        </StylesProvider>
    </Router>
  )
}






