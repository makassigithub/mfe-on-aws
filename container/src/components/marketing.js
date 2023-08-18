import React, { useEffect, useRef} from 'react';
import { useHistory } from 'react-router-dom';

import { mount } from "marketing/MarketingApp";

export default () => {
    const ref = useRef(null);
    const history = useHistory()

    useEffect(()=>{
       const { onParentNavigate } =  mount(ref.current, 
            {  
                // when history.listen is called inside the container,
                // It passes the location object to the provided callback
                // We can use the <pathname> of that object
                onNavigate :({ pathname: nextPathName }) => {

                    // We now update the browser url with the incomin path
                    // But only if it is different the host current path
                    const { pathname }  = history.location;
                    if(pathname !== nextPathName){
                        history.push(nextPathName);
                    }
                        
                }
            });

            history.listen(onParentNavigate);
    },[])

    return <div ref={ref}></div>
}