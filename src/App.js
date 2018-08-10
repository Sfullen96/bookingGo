import React from 'react';
import { Switch, Route } from 'react-router-dom';
import PickupLocationForm from './containers/PickupLocationForm/PickupLocationForm';
import SearchResults from './components/SearchResults/SearchResults';
import './css/index.scss';

export const App = () => (
    <Switch>
        <Route exact path="/" component={PickupLocationForm} />
        <Route path="/search" component={PickupLocationForm} />
        <Route path="/search-results" component={SearchResults} />
    </Switch>
);

export default App;
