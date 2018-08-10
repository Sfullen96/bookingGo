import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import PickupLocationForm from './containers/PickupLocationForm/PickupLocationForm';
import './css/index.scss';

export const App = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={PickupLocationForm} />
            <Route path="/search" component={PickupLocationForm} />
        </Switch>
    </BrowserRouter>
);

export default App;
