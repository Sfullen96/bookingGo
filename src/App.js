import React from 'react';
import { Switch, Route } from 'react-router-dom';
import PickupLocationForm from './containers/PickupLocationForm/PickupLocationForm';
import './css/index.scss';

export const App = () => (
    <Switch>
        <Route exact path="/" component={PickupLocationForm} />
        <Route path="/search" component={PickupLocationForm} />
    </Switch>
);

export default App;
