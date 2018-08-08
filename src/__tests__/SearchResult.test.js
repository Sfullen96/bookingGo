import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import SearchResult from '../components/SearchResult/SearchResult';

Enzyme.configure({ adapter: new Adapter() });

/*
* Test that the SearchResult renders
* and matches it's latest snapshot
* */
it('should render the SearchResult component and it should match the snapshot', () => {
    const component = shallow( <SearchResult /> );
    expect(component).toMatchSnapshot();
});