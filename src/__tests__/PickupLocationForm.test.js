import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import PickupLocationForm from '../containers/PickupLocationForm/PickupLocationForm';

Enzyme.configure({ adapter: new Adapter() });

/*
* Test that the PickupLocationForm renders
* and matches it's latest snapshot
* */
it('should render PickupLocationForm component and it should match the snapshot', () => {
    const component = shallow( <PickupLocationForm /> );
    expect(component).toMatchSnapshot();
});