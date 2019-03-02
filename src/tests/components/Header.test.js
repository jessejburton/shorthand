import React from 'react';
import { Header } from '../../components/Header';
// import toJSON from 'enzyme-to-json'; // Not needed with config serializer setup
import { shallow } from 'enzyme';

test('should render Header correctly', () => {
  const wrapper = shallow(<Header startLogout={() => {}} />);
  expect(wrapper).toMatchSnapshot();

  //expect(toJSON(wrapper)).toMatchSnapshot(); // toJSON is No longer needed with serializer
  // Using Enzyme
  //expect(wrapper.find('h1').text()).toBe('Expensify');
  // Using React Shallow Renderer
  //     const renderer = new ReactShallowRenderer();
  //   renderer.render(<Header />);
  //   expect(renderer.getRenderOutput()).toMatchSnapshot();
});

test('should call startLogout on button click', () => {
  const startLogout = jest.fn();
  const wrapper = shallow(<Header startLogout={startLogout} />);
  wrapper.find('button').simulate('click');
  expect(startLogout).toHaveBeenCalled();
});
