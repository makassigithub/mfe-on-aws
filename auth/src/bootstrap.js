import React from 'react';
import ReactDOM  from 'react-dom';
import { createMemoryHistory, createBrowserHistory } from 'history'

import App from './app';

const mount = (el, { onNavigate, onSignIn, defaultHistory, initialPath }) => {
    //Default history is only provided in development mode
    const history = defaultHistory || createMemoryHistory({
        initialEntries:[initialPath]
    });

        // The history.listen() receives a callback and calls it by providing 
    // the location object to it when the history changes
    if(onNavigate){
        history.listen(onNavigate);
    }
       
    ReactDOM.render(
        <App history={history} onSignIn={onSignIn}/>, el
    )
 
        
        // We also want the navigate function to return some information 
        //after it is called by the parent that can be used by history.listen to update
        // child's history too.
        return {
            onParentNavigate:({ pathname: nextPathName} )=> {
                const { pathname } = history.location;
                if(nextPathName !== pathname){
                    history.push(nextPathName)
                }
            }
        }

};

if(process.env.NODE_ENV === 'development'){
    const root = document.querySelector('#_dev_auth_root');
    if(root){
        mount(root,{defaultHistory: createBrowserHistory()});
    }
}


export { mount };