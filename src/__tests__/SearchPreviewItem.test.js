/* eslint-disable no-undef */
import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import SearchPreviewItem from '../components/SearchPreviewItem/SearchPreviewItem';

Enzyme.configure({ adapter: new Adapter() });

/*
* Test that the SearchPreview renders
* and matches it's latest snapshot
* */
it('Should render the search preview and it should match the snapshot', () => {
    const component = shallow(<SearchPreviewItem />);
    expect(component).toMatchSnapshot();
});
