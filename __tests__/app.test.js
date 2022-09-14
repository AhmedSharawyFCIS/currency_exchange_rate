import React from 'react';
import App from '../src/App';
import { shallow } from 'enzyme';

it('renders App correctly', () => {
  const wrapper = shallow(<App />);
  expect(wrapper).toBeDefined();
});
