import React from 'react';

import Navigation from '../src/navigation';

import { shallow } from 'enzyme';

it('renders Navigation correctly', () => {
  const wrapper = shallow(<Navigation />);

  expect(wrapper).toBeDefined();
});
