import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import SearchResults from '../components/SearchResults/SearchResults';

Enzyme.configure({ adapter: new Adapter() });

/*
* Test that the SearchResults renders
* and matches it's latest snapshot
* */
it('should render the SearchResults component and it should match the snapshot', () => {
    const component = shallow( <SearchResults /> );
    expect(component).toMatchSnapshot();
});