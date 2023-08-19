import React, { useEffect, useRef} from 'react';
import { useHistory } from 'react-router-dom';

import { mount } from "auth/AuthApp";

export default ({ onSignIn }) => {
    const ref = useRef(null);
    const history = useHistory()
    console.log(history.location.pathname);

    useEffect(()=>{
       const { onParentNavigate } =  mount(ref.current,
            {  
                initialPath: history.location.pathname,
                onNavigate :({ pathname: nextPathName }) => {
                    const { pathname }  = history.location;
                    if(pathname !== nextPathName){
                        history.push(nextPathName);
                    }
                },
                onSignIn
            });

            history.listen(onParentNavigate);
    },[])

    return <div ref={ref}></div>
}