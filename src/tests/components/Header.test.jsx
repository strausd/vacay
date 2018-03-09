import React from 'react';
import { shallow } from 'enzyme';

import Header from '../../components/atoms/Header';


test('should render Header component properly', () => {
    const wrapper = shallow(<Header />);
    
    expect(wrapper).toMatchSnapshot();
});