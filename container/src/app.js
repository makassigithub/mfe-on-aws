import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import {StylesProvider, createGenerateClassName} from '@material-ui/core/styles';

import Header from './components/Header'
import MarketingApp from './components/marketing';

const generateClassname = createGenerateClassName({
    productionPrefix: 'co'
})

export default () =>

<BrowserRouter>
    <StylesProvider generateClassName={generateClassname}>
        <div>
            <Header/>
            <MarketingApp/>
        </div> 
    </StylesProvider>
</BrowserRouter>




