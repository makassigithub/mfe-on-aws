import React, { useEffect, useRef} from 'react';
import { useHistory } from 'react-router-dom';

import { mount } from "auth/AuthApp";

export default () => {
    const ref = useRef(null);
    const history = useHistory()

    useEffect(()=>{
       const { onParentNavigate } =  mount(ref.current,
            {  
                initialPath: history.location.pathname,
                onNavigate :({ pathname: nextPathName }) => {
                    if(pathname !== nextPathName){
                        history.push(nextPathName);
                    }
                }
            });

            history.listen(onParentNavigate);
    },[])

    return <div ref={ref}></div>
}